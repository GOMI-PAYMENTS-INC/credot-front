import { Fragment, ReactNode } from 'react';

import SideBar from '@/components/layouts/SideBar';

export interface IDefalutProps {
  children?: ReactNode;
}
export const DetailReportSection = ({ children }: IDefalutProps) => {
  return (
    <Fragment>
      <div className='flex'>
        <SideBar />
        <section className='box-content flex h-screen w-screen grow justify-center overflow-y-scroll bg-grey-50 '>
          <div className='relative grid h-full min-w-[1180px] max-w-[1240px] grid-cols-12  justify-items-center gap-x-6 px-[30px] '>
            {children}
          </div>
        </section>
      </div>
    </Fragment>
  );
};
