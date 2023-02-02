import { ReactNode } from 'react';

import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { PATH } from '@/router/routeList';

export interface ICommon1SectionProps {
  children?: ReactNode;
}
export const Common1Section = ({ children }: ICommon1SectionProps) => (
  <div className='h-full  w-full bg-orange-100'>
    <div className='container h-full w-full '>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <div>
          <Link to={PATH.SEARCH_PRODUCTS}>
            <ReactSVG
              src='/assets/icons/Logo.svg'
              className='w-30 h-8 cursor-pointer'
              beforeInjection={(svg) => {
                svg.setAttribute('style', 'width: 166px');
              }}
            />
          </Link>
        </div>
        <div className='mt-8 box-border h-[calc(100vh-72px-48px)] w-full max-w-[536px] rounded-3xl bg-white px-[60px] py-[48px] pb-[32px] shadow-[0_0_16px_8px_rgba(0,0,0,0.02)]'>
          {children}
        </div>
      </div>
    </div>
  </div>
);
