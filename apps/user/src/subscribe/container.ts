import type { Dispatch, SetStateAction } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { PATH } from '@/router/routeList';
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
export const registerCard = (userId: string, userEmail: number) => {
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
    function (rsp: any) {
      // callback
      if (rsp.success) {
        // 빌링키 발급 성공
        // jQuery로 HTTP 요청
        console.log(rsp);
      } else {
        // 빌링키 발급 실패
      }
    },
  );
};

export const paymentRequestResult = () => {};
