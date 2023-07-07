import type { Dispatch, SetStateAction } from 'react';
import type { Swiper } from 'swiper';
import { TAB_DATA } from '@/home/constant';

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

//탭 이동 네비게이션-다음
export const dragTab = (params: {
  activeTabIndex: number;
  changeActiveTab: Dispatch<SetStateAction<number>>;
  swiper: Swiper | undefined;
  type: 'NEXT' | 'PREV';
}) => {
  const { activeTabIndex, changeActiveTab, swiper, type } = params;

  if (type === 'NEXT' && activeTabIndex !== TAB_DATA.length - 1) {
    const nextTab = activeTabIndex + 1;
    onChangeTab({ tabIndex: nextTab, changeActiveTab, swiper });
  }
  if (type === 'PREV' && activeTabIndex !== 0) {
    const prevTab = activeTabIndex - 1;
    onChangeTab({ tabIndex: prevTab, changeActiveTab, swiper });
  }
};
