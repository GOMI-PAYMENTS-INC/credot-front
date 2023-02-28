import { Fragment, ReactNode } from 'react';

import SideBar from '@/components/layouts/SideBar';

export interface IDefalutProps {
  children?: ReactNode;
}

export const Defalut = ({ children }: IDefalutProps) => {
  return (
    <Fragment>
      <div className='flex h-full'>
        <SideBar />
        <div className='flex w-full flex-col'>{children}</div>
      </div>
    </Fragment>
  );
};
