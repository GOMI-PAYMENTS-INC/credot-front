import type { Dispatch, SetStateAction } from 'react';
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
