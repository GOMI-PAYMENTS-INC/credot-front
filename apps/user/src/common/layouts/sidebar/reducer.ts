import { menuData } from '@/common/layouts/sidebar/constants';

export enum SIDE_BAR_ACTION {
  TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR',
  TOGGLE_DEPTH_MENU = 'TOGGLE_DEPTH_MENU',
  //마이 메뉴 토글
  TOGGLE_USER_MENU = 'TOGGLE_USER_MENU',
}

export type TSidebarAction = {
  type: SIDE_BAR_ACTION;
  payload?: any; // FIXME: any 지우기
};

const sidebarInitialState: TSidebarState = {
  openedSidebar: true,
  //lnb 내 메뉴 열림 여부
  openedDepthList: [Object.values(menuData)[0].key],
  //마이 메뉴 열림 여부
  openedUserMenu: false,
};

const sidebarReducer = (_state: TSidebarState, action: TSidebarAction) => {
  const state = structuredClone(_state);

  switch (action.type) {
    case SIDE_BAR_ACTION.TOGGLE_SIDE_BAR: {
      state.openedSidebar = !state.openedSidebar;
      return state;
    }

    case SIDE_BAR_ACTION.TOGGLE_DEPTH_MENU: {
      state.openedDepthList = action.payload.openedDepthList;
      return state;
    }

    case SIDE_BAR_ACTION.TOGGLE_USER_MENU: {
      state.openedUserMenu = !state.openedUserMenu;
      return state;
    }

    default:
      return state;
  }
};

export { sidebarReducer, sidebarInitialState };
