import { Fragment, ReactNode } from 'react';

import SideBar from '@/components/layouts/SideBar';

export interface IDefalutProps {
  children?: ReactNode;
}

export const Default = ({ children }: IDefalutProps) => {
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
