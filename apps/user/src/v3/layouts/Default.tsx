import { Fragment, ReactNode } from 'react';
import { isMobile } from 'react-device-detect';

import { SideBar } from '@/v3/layouts/SideBar';

interface IDefaultProps {
  children?: ReactNode;
}

export const Default = ({ children }: IDefaultProps) => {
  return (
    <Fragment>
      <div className='h-screen'>
        <Fragment>
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full`}>
            <SideBar />
            <div className='w-full'>{children}</div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};
