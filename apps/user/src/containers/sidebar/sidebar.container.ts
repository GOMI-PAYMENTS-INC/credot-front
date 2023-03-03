import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { SIDE_BAR_ACTION, TSidebarAction } from '@/containers/sidebar/sidebar.reducer';
import { useComponentVisible } from '@/utils/useComponentVisible';

//사이드 바 토클
export const toggleSidebar = (_dispatch: Dispatch<TSidebarAction>) => {
  _dispatch({ type: SIDE_BAR_ACTION.TOGGLE_SIDE_BAR });
};

//사이드 내 메뉴 토글
export const toggleDepth2Menu = (
  _state: TSidebarState,
  _dispatch: Dispatch<TSidebarAction>,
  menuId: string,
) => {
  const openedDepth2List = _state.openedDepthList;

  if (openedDepth2List.find((one) => one === menuId)) {
    const filter = openedDepth2List.filter((one) => one !== menuId);
    _dispatch({
      type: SIDE_BAR_ACTION.TOGGLE_DEPTH_MENU,
      payload: { openedDepthList: [...filter] },
    });
  } else {
    _dispatch({
      type: SIDE_BAR_ACTION.TOGGLE_DEPTH_MENU,
      payload: { openedDepthList: [...openedDepth2List, menuId] },
    });
  }
};
//사이드바 하단 마이메뉴 토글
export const onClickUserMenu = (_dispatch: Dispatch<TSidebarAction>) => {
  _dispatch({ type: SIDE_BAR_ACTION.TOGGLE_USER_MENU });
};
