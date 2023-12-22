import { Fragment, ReactNode } from 'react';

import { SideBar } from '@/v3/layouts/SideBar';

interface IDefaultProps {
  children?: ReactNode;
}

export const Default = ({ children }: IDefaultProps) => {
  return (
    <Fragment>
      <div className='h-screen'>
        <Fragment>
          <div className={`flex h-full`}>
            <SideBar />
            <div className='w-full'>{children}</div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};
