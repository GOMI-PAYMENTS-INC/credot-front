import { Fragment, ReactNode, useReducer } from 'react';
import SideBar from '@/common/layouts/sidebar/SideBar';
import { sidebarInitialState, sidebarReducer } from '@/common/layouts/sidebar/reducer';

interface IDefaultProps {
  children?: ReactNode;
}

export const Default = ({ children }: IDefaultProps) => {
  const [_state, _dispatch] = useReducer(sidebarReducer, sidebarInitialState);

  return (
    <Fragment>
      <div className='h-screen'>
        <SideBar _state={_state} _dispatch={_dispatch} />
        <div className={`${_state.openedSidebar ? 'ml-[200px]' : 'ml-[64px]'} xs:ml-0`}>
          {children}
        </div>
      </div>
    </Fragment>
  );
};
