type TSidebarState = {
  //lnb 열림 여부
  openedSidebar: boolean;
  //lnb 내 메뉴 열림 여부
  openedDepthList: string[];
  //마이 메뉴 열림 여부
  openedUserMenu: boolean;
  sideBarWidth: 0 | 64 | 200;
};
