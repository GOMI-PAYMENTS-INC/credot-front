import type { Dispatch, SetStateAction } from 'react';
import type { Swiper } from 'swiper';

export const onChangeTab = (params: {
  tabIndex: number;
  changeActiveTab: Dispatch<SetStateAction<number>>;
  swiper: Swiper | undefined;
}) => {
  const { changeActiveTab, swiper, tabIndex } = params;
  changeActiveTab(tabIndex);
  swiper?.slideTo(tabIndex);
};

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
