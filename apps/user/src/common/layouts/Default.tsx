import { Fragment, ReactNode, useEffect, useReducer, useState } from 'react';
import SideBar from '@/common/layouts/sidebar/SideBar';
import MSidebar from '@/common/layouts/sidebar/MSidebar';
import GNB from '@/common/layouts/NewGNB';
import { useMatch } from 'react-router-dom';
import { sidebarInitialState, sidebarReducer } from '@/common/layouts/sidebar/reducer';
import { useRecoilValue } from 'recoil';
import { HackleId } from '@/atom/common/hackle.atom';

interface IDefaultProps {
  children?: ReactNode;
}

export const Default = ({ children }: IDefaultProps) => {
  const [_state, _dispatch] = useReducer(sidebarReducer, sidebarInitialState);
  const [handleCss, setHandleCss] = useState('');
  const hackleId = useRecoilValue(HackleId);
  const pattern = useMatch('report/:id')?.pattern;

  useEffect(() => {
    pattern?.path ? setHandleCss('') : setHandleCss('h-full');
  }, [pattern]);

  return (
    <Fragment>
      <div className='h-screen'>
        <SideBar _state={_state} _dispatch={_dispatch} />
        <MSidebar _state={_state} _dispatch={_dispatch} />
        <div
          className={`${handleCss} ${
            _state.openedSidebar ? 'ml-[200px]' : 'ml-[64px]'
          } xs:ml-0`}
        >
          {children}
        </div>

        {/* {hackleId === 'A' ? (
          <Fragment>
            <SideBar _state={_state} _dispatch={_dispatch} />
            <MSidebar _state={_state} _dispatch={_dispatch} />
            <div
              className={`${handleCss} ${
                _state.openedSidebar ? 'ml-[200px]' : 'ml-[64px]'
              } xs:ml-0`}
            >
              {children}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <GNB />
            <div className={handleCss}>{children}</div>
          </Fragment>
        )} */}
      </div>
    </Fragment>
  );
};
