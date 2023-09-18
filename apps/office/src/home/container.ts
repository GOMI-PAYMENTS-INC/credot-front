import type { Dispatch, SetStateAction } from 'react';
import type { Swiper } from 'swiper';
import { TAB_DATA } from '@/home/constants';

export const onChangeTab = (params: {
  tabIndex: number;
  changeActiveTab: Dispatch<SetStateAction<number>>;
  swiper: Swiper | undefined;
}) => {
  const { changeActiveTab, swiper, tabIndex } = params;
  changeActiveTab(tabIndex);
  swiper?.slideTo(tabIndex);
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
