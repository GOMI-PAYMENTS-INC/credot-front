import { MENU_DATA } from '@/common/layouts/sidebar/constants';

export enum SIDE_BAR_ACTION {
  TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR',
  TOGGLE_DEPTH_MENU = 'TOGGLE_DEPTH_MENU',
  //마이 메뉴 토글
  TOGGLE_USER_MENU = 'TOGGLE_USER_MENU',
  TOGGLE_FUNCTION_MENU = 'TOGGLE_FUNCTION_MENU',
  CHANGE_SIDE_BAR_STATE = 'CHANGE_SIDE_BAR_STATE',
}

export type TSidebarAction = {
  type: SIDE_BAR_ACTION;
  payload?: any; // FIXME: any 지우기
};

const sidebarInitialState: TSidebarState = {
  openedSidebar: window.innerWidth < 432 ? false : true,
  //lnb 내 메뉴 열림 여부
  openedDepthList: [Object.values(MENU_DATA)[0].key],
  //마이 메뉴 열림 여부
  openedUserMenu: false,
  openedFuncionMenu: false,
  sideBarWidth: 200,
};

const sidebarReducer = (_state: TSidebarState, action: TSidebarAction) => {
  const state = structuredClone(_state);

  switch (action.type) {
    case SIDE_BAR_ACTION.TOGGLE_SIDE_BAR: {
      const switchState = !state.openedSidebar;
      state.openedSidebar = switchState;
      state.sideBarWidth = switchState === true ? 200 : 64;
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

    case SIDE_BAR_ACTION.TOGGLE_FUNCTION_MENU: {
      state.openedFuncionMenu = !state.openedFuncionMenu;
      return state;
    }

    default:
      return state;
  }
};

export { sidebarReducer, sidebarInitialState };
