import { Fragment, ReactNode } from 'react';

import SideBar from '@/components/layouts/SideBar';

interface IDefaultProps {
  children?: ReactNode;
}

export const Default = ({ children }: IDefaultProps) => {
  return (
    <Fragment>
      <div className='h-screen'>
        <div className='flex h-full'>
          <SideBar />
          <div className='flex w-full flex-col'>{children}</div>
        </div>
      </div>
    </Fragment>
  );
};
