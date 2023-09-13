import type { Dispatch, SetStateAction } from 'react';
import {
  getPlans,
  postUserCard,
  getUserCards,
  postPayment,
  getPayment,
} from '@/subscribe/api';
import { CACHING_KEY } from '@/types/enum.code';

import type { NavigateFunction } from 'react-router-dom';
import { PATH } from '@/router/routeList';
import { v4 as uuidv4 } from 'uuid';

import { isFalsy } from '@/utils/isFalsy';
import { isTruthy } from '@/utils/isTruthy';
import { useSessionStorage } from '@/utils/useSessionStorage';

export const DATA = [
  {
    createdAt: '2023.08.23 16:04:32',
    subscribeDate: '2023.08.16 ~ 2023.09.16',
    creditCard: '국민 46323558****893*',
    plan: '카테고리 분석ㅣFree 플랜',
    status: true,
    price: '10000',
  },
  {
    createdAt: '2023.08.23 16:04:32',
    subscribeDate: '2023.08.16 ~ 2023.09.16',
    creditCard: '국민 46323558****893*',
    plan: '카테고리 분석ㅣPro 플랜',
    status: false,
    price: '16000',
  },
  {
    createdAt: '2023.08.23 16:04:32',
    subscribeDate: '2023.08.16 ~ 2023.09.16',
    creditCard: '국민 46323558****893*',
    plan: '카테고리 분석ㅣStarter 플랜',
    status: false,
    price: '10000',
  },
  {
    createdAt: '2023.08.23 16:04:32',
    subscribeDate: '2023.08.16 ~ 2023.09.16',
    creditCard: '국민 46323558****893*',
    plan: '카테고리 분석ㅣPro 플랜',
    status: true,
    price: '16000',
  },
];

export const openFAQ = (params: {
  faqIndex: number;
  openedFAQ: number[];
  setOpenedFAQ: Dispatch<SetStateAction<number[]>>;
}) => {
  const { faqIndex, openedFAQ, setOpenedFAQ } = params;
  if (openedFAQ.find((one) => one === faqIndex)) {
    //체크 해제할때 checkedItems에 있을 경우
    const payload = openedFAQ.filter((one) => one !== faqIndex);
    setOpenedFAQ(payload);
  } else {
    const payload = openedFAQ.concat(faqIndex);
    setOpenedFAQ(payload);
  }
};

export const updateSelectedPlan = (
  selectedPaln: TPlanType,
  _dispatch: Dispatch<SetStateAction<TPlanType>>,
) => {
  _dispatch(selectedPaln);
};

declare const IMP: any;
export const registerCard = (
  userId: string,
  userEmail: number,
  setUserCards: Dispatch<SetStateAction<TUserCard[]>>,
) => {
  const userCode = import.meta.env.VITE_PORTONE_CODE;
  const PG_MID = 'iamporttest_4';
  const UUID = uuidv4();

  IMP.init(userCode);
  IMP.request_pay(
    {
      pg: `tosspayments.${PG_MID}`,
      pay_method: 'card', // 'card'만 지원됩니다.
      merchant_uid: UUID, // 상점에서 관리하는 주문 번호
      name: '최초인증결제',
      amount: 0, // 실제 승인은 발생되지 않고 오직 빌링키만 발급됩니다.
      customer_uid: UUID, // 필수 입력.
      buyer_email: userEmail,
      customer_id: userId, //가맹점이 회원에게 부여한 고유 ID
    },
    async (rsp: TPortOneResponse) => {
      // callback
      if (rsp.success) {
        const {
          customer_uid,
          currency,
          pg_provider,
          card_name,
          card_number,
          bank_name,
          merchant_uid,
        } = rsp;
        const payload = {
          customer_uid,
          currency,
          pg_provider,
          card_name,
          card_number,
          bank_name: bank_name ?? '',
          is_main: true,
          merchant_uid,
        };
        await postUserCard(payload);
        await _getUserCards(setUserCards);
      } else {
        // 빌링키 발급 실패
      }
    },
  );
};

export const storePlansIntoSession = async () => {
  if (isTruthy(sessionStorage.getItem(CACHING_KEY.PLANS))) return;
  try {
    const response = await getPlans();
    if (response) {
      sessionStorage.setItem(CACHING_KEY.PLANS, JSON.stringify(response));
    }
  } catch (error) {
    throw new Error('플랜 저장 과정에서 에러가 발생했습니다.');
  }
};

export const storePlans = async (
  setSelectedPlan: Dispatch<SetStateAction<TPlans | null>>,
  setPlans: Dispatch<SetStateAction<TPlans[]>>,
) => {
  const item = sessionStorage.getItem(CACHING_KEY.PLANS);
  if (isTruthy(item)) {
    const parsingItem = JSON.parse(item!) as TPlans[];
    setPlans(parsingItem);
    const [_state] = parsingItem.filter(
      (plans) => plans.uniqueKey !== 'PRODUCT_PLAN_FREE',
    );
    setSelectedPlan(_state);
    return;
  }

  try {
    const response = await getPlans();
    if (response) {
      sessionStorage.setItem(CACHING_KEY.PLANS, JSON.stringify(response));
      const [_state] = response.filter((plan) => plan.name !== 'Free');

      setPlans(response);
      setSelectedPlan(_state);
    }
  } catch (error) {
    throw new Error('플랜 저장 과정에서 에러가 발생했습니다.');
  }
};

export const switchPlans = (
  planName: TPlanNames,
  setSelectedPlan: Dispatch<SetStateAction<TPlans | null>>,
) => {
  const ITEM = sessionStorage.getItem(CACHING_KEY.PLANS);
  if (isFalsy(ITEM)) throw new Error('인기 검색어에 문제가 있습니다.');

  const response = JSON.parse(ITEM!) as TPlans[];
  const [_state] = response.filter((plan) => plan.name === planName);
  setSelectedPlan(_state);
};

export const insertDash = (str: string | undefined) => {
  if (str === undefined) return '';
  return str.split('').reduce((pre, cur, idx) => {
    if (idx !== 0 && idx % 4 === 0) {
      return pre + '-' + cur;
    }
    return pre + cur;
  }, '');
};

export const _getUserCards = async (
  setUserCards: Dispatch<SetStateAction<TUserCard[]>>,
) => {
  try {
    const response = await getUserCards();
    setUserCards(response);
  } catch (error) {
    throw new Error('유저 정보를 상태에 저장하는 과정에서 에러가 발생했습니다.');
  }
};

export const _postPayment = async (
  uniqueKey: TPlanUniqueKey | undefined,
  navigator: NavigateFunction,
  setIsError: Dispatch<SetStateAction<boolean>>,
  userCards: TUserCard[],
) => {
  if (isFalsy(userCards)) {
    return setIsError(true);
  }
  if (uniqueKey) {
    const response = await postPayment({ uniqueKey });
    let path = 'accepted';
    if (isTruthy(response.failReason)) path = 'rejected';

    return navigator(PATH.RESULT_OF_PAY_REQUEST.replace(':result', path), {
      state: { response },
    });
  }
};

export const _getPayments = async (setBills: Dispatch<SetStateAction<TPayments[]>>) => {
  const response = await getPayment();
  return setBills(response);
};

export const convertPlan = (plan: TPlanUniqueKey): TPlanNames | string => {
  const plans = useSessionStorage.getItem(CACHING_KEY.PLANS);

  if (isTruthy(plans)) {
    return `${plans.find((pl: TPlans) => pl.uniqueKey === plan).name} 플랜`;
  }
  return '하하';
};
