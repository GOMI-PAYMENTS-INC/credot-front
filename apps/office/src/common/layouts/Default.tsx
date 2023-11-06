import { Fragment, ReactNode, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';

import GNB from '@/common/layouts/GNB';
import { SideBar } from '@/common/layouts/SideBar';
import { PATH } from '@/types/enum.code';

interface IDefaultProps {
  children?: ReactNode;
  useGap?: boolean;
}

export const Default = ({ children, useGap = false }: IDefaultProps) => {
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
        <Fragment>
          <GNB />
          <div className={`${handleCss} ${useGap ? 'mt-[72px]' : ''} flex`}>
            <SideBar />
            <div className='w-full'>{children}</div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};
