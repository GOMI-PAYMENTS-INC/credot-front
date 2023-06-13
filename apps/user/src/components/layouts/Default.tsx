import { Fragment, ReactNode, useMemo, useReducer } from 'react';

import SideBar from '@/components/layouts/SideBar';
import {
  sidebarInitialState,
  sidebarReducer,
} from '@/containers/sidebar/sidebar.reducer';

interface IDefaultProps {
  children?: ReactNode;
}

export const Default = ({ children }: IDefaultProps) => {
  const [_state, _dispatch] = useReducer(sidebarReducer, sidebarInitialState);
  const sideBarOpenWidth = 200;
  const sideBarCloseWidth = 64;

  const sideBarWidthStyle = useMemo(
    () =>
      _state.openedSidebar
        ? { marginLeft: sideBarOpenWidth }
        : { marginLeft: sideBarCloseWidth },
    [_state.openedSidebar],
  );
  return (
    <Fragment>
      <div className='h-screen'>
        <SideBar
          openWidth={sideBarOpenWidth}
          closeWidth={sideBarCloseWidth}
          _state={_state}
          _dispatch={_dispatch}
        />
        <div style={sideBarWidthStyle}>{children}</div>
      </div>
    </Fragment>
  );
};
