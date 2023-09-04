import type { Dispatch, SetStateAction } from 'react';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
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

export const openPaymentWidget = async (
  _dispatch: Dispatch<SetStateAction<boolean>>,
  selectedPaln: TPlanType,
  userEmail?: string,
) => {
  try {
    const clientKey = import.meta.env.VITE_TOSS_KEY;
    const customerKey = 'kBovVXSJLsTahwvFA5tr-';
    const uuid = uuidv4();

    const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

    paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: selectedPaln.price },
      { variantKey: 'widgetA' }, // 렌더링하고 싶은 결제 UI의 variantKey
    );

    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
    const path = {
      success: window.location.host + PATH.SUBSCRIBE,
      failed: window.location.host + PATH.UPGRADE_PLAN,
    };
    await paymentWidget?.requestPayment({
      orderId: uuid,
      orderName: `${selectedPaln.name} 플랜`,
      customerEmail: userEmail,
      successUrl: path.success,
      failUrl: path.failed,
    });
  } catch (error) {
    // 에러 처리하기
    _dispatch(false);

    console.error(error);
  }
};

export const cleanUpWidget = () => {};

export const updateSelectedPlan = (
  selectedPaln: TPlanType,
  _dispatch: Dispatch<SetStateAction<TPlanType>>,
) => {
  _dispatch(selectedPaln);
};
