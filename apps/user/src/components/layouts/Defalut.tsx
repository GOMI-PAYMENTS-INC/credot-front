import { Fragment, ReactNode } from 'react';

import SideBar from '@/components/layouts/SideBar';

export interface IDefalutProps {
  children?: ReactNode;
}
export const Defalut = ({ children }: IDefalutProps) => {
  return (
    <Fragment>
      <SideBar />
      <div className='ml-[200px] box-content flex min-h-full w-full w-[calc(100%-200px)] justify-center bg-grey-50'>
        <div className='relative grid max-w-[1240px] grid-cols-12  justify-items-center gap-x-6 px-[30px] pb-10'>
          {children}
        </div>
      </div>
    </Fragment>
  );
};
