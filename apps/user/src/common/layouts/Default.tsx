import { Fragment, ReactNode, useEffect, useReducer, useState } from 'react';
import MSidebar from './sidebar/MSidebar';
import GNB from '@/common/layouts/NewGNB';
import { useMatch } from 'react-router-dom';
import { sidebarInitialState, sidebarReducer } from '@/common/layouts/sidebar/reducer';
import { PATH } from '@/types/enum.code';
interface IDefaultProps {
  children?: ReactNode;
  useGap?: boolean;
}

export const Default = ({ children, useGap = false }: IDefaultProps) => {
  const [_state, _dispatch] = useReducer(sidebarReducer, sidebarInitialState);
  const [handleCss, setHandleCss] = useState('');

  const pattern = [PATH.REPORT_DETAIL, PATH.REPORT_DETAIL_BY_SHARE].some(
    (path) => useMatch(path)?.pattern,
  );

  useEffect(() => {
    pattern ? setHandleCss('') : setHandleCss('h-full');
  }, [pattern]);

  return (
    <Fragment>
      <div className='h-screen'>
        {window.innerWidth < 432 ? (
          <Fragment>
            <MSidebar _state={_state} _dispatch={_dispatch} />
            <div className={handleCss}>{children}</div>
          </Fragment>
        ) : (
          <Fragment>
            <GNB />
            <div className={`${handleCss} ${useGap ? 'mt-[72px]' : ''}`}>{children}</div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
