import { Fragment, ReactNode, useEffect, useReducer, useState } from 'react';

import GNB from '@/common/layouts/NewGNB';
import { useMatch } from 'react-router-dom';
import { sidebarInitialState, sidebarReducer } from '@/common/layouts/sidebar/reducer';

interface IDefaultProps {
  children?: ReactNode;
  useGap?: boolean;
}

export const Default = ({ children, useGap = false }: IDefaultProps) => {
  const [_state, _dispatch] = useReducer(sidebarReducer, sidebarInitialState);
  const [handleCss, setHandleCss] = useState('');

  const pattern = useMatch('report/:id')?.pattern;

  useEffect(() => {
    pattern?.path ? setHandleCss('') : setHandleCss('h-full');
  }, [pattern]);

  return (
    <Fragment>
      <div className='h-screen'>
        <Fragment>
          <GNB />
          <div className={`handleCss ${useGap ? 'mt-[72px]' : ''}`}>{children}</div>
        </Fragment>
      </div>
    </Fragment>
  );
};
