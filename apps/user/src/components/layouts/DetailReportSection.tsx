// import { Fragment, ReactNode } from 'react';

// import SideBar from '@/components/layouts/SideBar';

// export interface IDefalutProps {
//   children?: ReactNode;
// }
// export const DetailReportSection = ({ children }: IDefalutProps) => {
//   return (
//     <Fragment>
//       <div className='flex'>
//         <SideBar />

//         <div className='ml-[200px] box-content flex w-[calc(100%-200px)] justify-center'>
//           <div className='relative grid h-full max-w-[1240px] grid-cols-12  justify-items-center gap-x-6 px-[30px] '>
//             {children}
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

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

        <section className='box-content flex w-screen grow justify-center'>
          <div className='relative grid h-full max-w-[1240px] grid-cols-12  justify-items-center gap-x-6 px-[30px] '>
            {children}
          </div>
        </section>
      </div>
    </Fragment>
  );
};
