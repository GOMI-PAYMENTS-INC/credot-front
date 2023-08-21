import { Fragment, ReactNode, useReducer } from 'react';
import SideBar from '@/common/layouts/sidebar/SideBar';
import MSidebar from '@/common/layouts/sidebar/MSidebar';
import GNB from '@/common/layouts/NewGNB';

import { sidebarInitialState, sidebarReducer } from '@/common/layouts/sidebar/reducer';

interface IDefaultProps {
  children?: ReactNode;
}

export const Default = ({ children }: IDefaultProps) => {
  const [_state, _dispatch] = useReducer(sidebarReducer, sidebarInitialState);

  return (
    <Fragment>
      <div className='h-screen'>
        {/* <SideBar _state={_state} _dispatch={_dispatch} />
        <MSidebar _state={_state} _dispatch={_dispatch} />
        <div
          className={`${
            _state.openedSidebar ? 'ml-[200px]' : 'ml-[64px]'
          } h-full xs:ml-0`}
        >
          {children}
        </div> */}
        <GNB />
        <div className=''>{children}</div>
      </div>
    </Fragment>
  );
};
