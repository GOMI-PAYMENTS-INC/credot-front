import type { Dispatch, SetStateAction } from 'react';
import {
  postUserCard,
  getUserCards,
  postPayment,
  getPayment,
  patchUserCard,
  deleteUserCard,
  patchDowngrade,
  patchCancelDowngrade,
  patchUnsubscription,
  patchCancelUnsubscription,
} from '@/subscribe/api';
import { CACHING_KEY, STATUS_CODE } from '@/types/enum.code';

import { toast } from 'react-toastify';
import type { NavigateFunction } from 'react-router-dom';
import { PATH } from '@/common/constants';
import { v4 as uuidv4 } from 'uuid';
import { _getSubscription } from '@/common/container';

import { isFalsy } from '@/utils/isFalsy';
import { isTruthy } from '@/utils/isTruthy';
import { SetterOrUpdater } from 'recoil';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { formatNumber } from '@/utils/formatNumber';
import { CARD_CODE } from '@/subscribe/constant';

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
  const PG_MID = import.meta.env.VITE_PG_MID;
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

export const storePlans = async (
  setSelectedPlan: Dispatch<SetStateAction<TPlans | null>>,
  userPlan: TPlanUniqueKey,
) => {
  const item = sessionStorage.getItem(CACHING_KEY.PLANS);
  if (isTruthy(item)) {
    const parsingItem = JSON.parse(item!) as TPlans[];

    const [starter, pro] = parsingItem.filter(
      (plans) => plans.uniqueKey !== 'KEYWORD ANALYSIS_FREE',
    );
    let _state;
    if (userPlan === 'KEYWORD ANALYSIS_FREE') {
      _state = starter;
    } else {
      _state = pro;
    }

    setSelectedPlan(_state);
    return;
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
    useSessionStorage.setItem(CACHING_KEY.USER_CARDS, response);
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
    if (response.data === null) {
      return navigator(PATH.RESULT_OF_PAY_REQUEST.replace(':result', 'rejected'), {
        state: { response },
      });
    }
    return navigator(PATH.RESULT_OF_PAY_REQUEST.replace(':result', 'accepted'), {
      state: { response },
    });
  }
};

export const upgradePlan = async (props: {
  cardId: number;
  uniqueKey: TPlanUniqueKey | undefined;
  navigator: NavigateFunction;
  setIsError: Dispatch<SetStateAction<boolean>>;
  userCards: TUserCard[];
}) => {
  const { cardId } = props;
  const response = await patchUserCard(cardId);
  if (response) {
    const { uniqueKey, navigator, setIsError, userCards } = props;
    return await _postPayment(uniqueKey, navigator, setIsError, userCards);
  }
  toast.error('결제카드를 읽는 중 문제가 발생했습니다. 다시 시도해주세요.');
};

export const _getPayments = async (setBills: Dispatch<SetStateAction<TPayments[]>>) => {
  const response = await getPayment();
  return setBills(response);
};

export const convertPlanImg = (plan: TPlanUniqueKey) => {
  switch (plan) {
    case 'KEYWORD ANALYSIS_FREE': {
      return 'Free';
    }
    case 'KEYWORD ANALYSIS_PRO': {
      return 'Pro';
    }
    default:
      return 'Starter';
  }
};

export const calculatorBar = (
  count: number,
  productUniqueKey: TPlanUniqueKey,
  barWidth: number = 180,
) => {
  switch (productUniqueKey) {
    case 'KEYWORD ANALYSIS_STARTER': {
      if (count === 50) return '100%';
      const width = barWidth / 50;
      return `${Math.floor(count * width)}px`;
    }
    case 'KEYWORD ANALYSIS_PRO': {
      if (count === 120) return '100%';
      const width = barWidth / 120;
      return `${Math.floor(count * width)}px`;
    }

    default:
      const width = barWidth / 5;
      return count === 5 ? '100%' : `${Math.floor(count * width)}px`;
  }
};

export const _patchUserCard = async (
  cardId: number,
  setUserCards: SetterOrUpdater<TUserCard[]>,
  useToast?: boolean,
) => {
  const response = await patchUserCard(cardId);

  if (isTruthy(response)) {
    setUserCards(response);
    useToast && toast.success('결제카드가 변경되었어요.');
    return;
  }

  toast.error('잠시 후 다시 요청해주세요.');
};

export const _deleteUserCard = async (
  cardId: number,
  setUserCards: SetterOrUpdater<TUserCard[]>,
) => {
  const response = await deleteUserCard(cardId);

  if (isTruthy(response)) {
    setUserCards(response);
    toast.success('카드가 삭제되었어요.');
    return;
  }
  toast.error('잠시 후 다시 요청해주세요.');
};

export const switchIsMain = (
  cardId: number,
  userCards: TUserCard[],
  setUserCards: SetterOrUpdater<TUserCard[]>,
) => {
  const _userCards: TUserCard[] = structuredClone(userCards).map((card) => {
    card.isMain = false;
    return card;
  });

  const payload = _userCards.map((card) => {
    if (card.id === cardId) {
      card.isMain = true;
      return card;
    }
    return card;
  });

  setUserCards(payload);
};

export const clearUserCards = (setUserCards: SetterOrUpdater<TUserCard[]>) =>
  setUserCards([]);

export const calcPrice = (
  chosenPlan: TPayments | TPlans,
  currentPlan: TGetSubscriptionResponse,
  amount?: number,
) => {
  const userPlan: TGetSubscriptionResponse = useSessionStorage.getItem(
    CACHING_KEY.USER_PLAN,
  );
  const selectedPlan: TPlans = useSessionStorage
    .getItem(CACHING_KEY.PLANS)
    .find((plan: TPlans) => plan.uniqueKey.includes(chosenPlan.name.toUpperCase()));
  const result = {
    name: selectedPlan.name,
    originPrice: formatNumber(selectedPlan.originPrice),
  };

  if (
    userPlan.productUniqueKey !== 'KEYWORD ANALYSIS_FREE' &&
    selectedPlan.priority > 1
  ) {
    const salePrice = amount
      ? selectedPlan.originPrice - amount
      : selectedPlan.price + (currentPlan.count / currentPlan.totalCount) * 10000;

    return Object.assign({}, result, {
      salePrice: formatNumber(salePrice),
      price: formatNumber(selectedPlan.originPrice - salePrice),
    });
  }

  return Object.assign({}, result, {
    salePrice: formatNumber(selectedPlan.price),
    price: formatNumber(selectedPlan.price),
  });
};

export const agreeChangedPlan = (
  value: TCheckboxOption,
  setError: Dispatch<SetStateAction<boolean | null>>,
) => (isFalsy(value) ? setError(true) : setError(false));

export const _downGrade = async (setIsOpen: SetterOrUpdater<boolean>) => {
  const response = await patchDowngrade();
  if (response.code === STATUS_CODE.SUCCESS) {
    return setIsOpen(true);
  }
  toast.error('잠시 후 다시 시도해주세요.');
};

export const _cancelDowngrade = async (
  setSubscription: SetterOrUpdater<TGetSubscriptionResponse | null>,
) => {
  const response = await patchCancelDowngrade();
  if (response.code === STATUS_CODE.SUCCESS) {
    toast.success('플랜 변경이 취소되었어요.');
    return _getSubscription(setSubscription);
  }
  toast.error('잠시 후 다시 시도해주세요.');
};

export const getCardImgPath = (cardCode: string) => {
  const code = CARD_CODE.find((code) => code.value === cardCode);
  if (code) {
    return code.value;
  }
  return 'ETC';
};

export const _patchUnsubscription = async (setIsOpen: SetterOrUpdater<boolean>) => {
  const response = await patchUnsubscription();
  if (response.code === STATUS_CODE.SUCCESS) {
    return setIsOpen(true);
  }
  toast.error('잠시 후 다시 시도해주세요.');
};

export const _patchCancelUnsubscription = async (
  setSubscription: SetterOrUpdater<TGetSubscriptionResponse | null>,
) => {
  const response = await patchCancelUnsubscription();
  if (response.code === STATUS_CODE.SUCCESS) {
    toast.success('구독 해지가 취소되었어요.');
    return _getSubscription(setSubscription);
  }
  toast.error('잠시 후 다시 시도해주세요.');
};

export const getSource = (pathname: string) => {
  const plans: TPlans[] = useSessionStorage.getItem(CACHING_KEY.PLANS);

  const builder = {
    text: '',
    plan: '',
    warningText: '',
    modalDiscription: '',
    warningDiscription: '',
    options: [{ text: '', value: '' }],
    planInfo: plans[0],
  };

  if (pathname === PATH.UNSUBSCRIPTION) {
    builder.text = '구독 해지';
    builder.plan = '적용 예정 플랜';
    builder.warningText = '구독 해지';
    builder.warningDiscription = '구독 해지는';
    builder.modalDiscription = ' 구독이 해지되어요.';
    builder.options = [
      { text: '구독 해지에 따른 유의사항을 이해했어요.', value: 'agree' },
    ];
    builder.planInfo = plans.find(
      (plan: TPlans) => plan.uniqueKey === 'KEYWORD ANALYSIS_FREE',
    )!;

    return builder;
  }

  builder.text = '플랜 변경';
  builder.plan = '적용 예정 플랜';
  builder.warningText = '하위 플랜으로 변경';
  builder.warningDiscription = '변경된 플랜은';
  builder.modalDiscription = ' 변경된 플랜이 적용되어요.';
  builder.options = [{ text: '플랜 변경에 따른 유의사항을 이해했어요.', value: 'agree' }];
  builder.planInfo = plans.find(
    (plan: TPlans) => plan.uniqueKey === 'KEYWORD ANALYSIS_STARTER',
  )!;

  return builder;
};

export const getCancelSource = (nextStatus: TNextStatus) => {
  if (nextStatus === 'UNSUBSCRIBE') {
    return { plan: 'Free' };
  }

  return { plan: 'Stater' };
};

export const turnDim = (
  trigger: boolean,
  setTrigger: Dispatch<SetStateAction<boolean>>,
) => {
  if (trigger) {
    setTimeout(() => {
      document
        .getElementsByClassName('imp-dialog customizable payment-tosspayments pc')[0]
        .setAttribute(
          'class',
          `${
            document.getElementsByClassName(
              'imp-dialog customizable payment-tosspayments pc',
            )[0].className
          } bg-black bg-opacity-20`,
        );
      setTrigger(false);
    }, 500);
  }
};
