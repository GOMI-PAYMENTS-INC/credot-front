import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { PATH } from '@/types/enum.code';

export interface ICommon1SectionProps {
  children?: ReactNode;
}
export const Common1Section = ({ children }: ICommon1SectionProps) => (
  <div className='h-full bg-purple-50 pb-5 pt-10 xs:bg-white xs:pt-0'>
    <div className='container-common h-full w-full '>
      <div className='flex h-full w-full flex-col items-center'>
        <div className='xs:hidden'>
          <Link to={PATH.SEARCH_PRODUCTS}>
            <ReactSVG
              src='/assets/Logo.svg'
              className='w-30 h-8 cursor-pointer'
              beforeInjection={(svg) => {
                svg.setAttribute('style', 'width: 166px');
              }}
            />
          </Link>
        </div>
        <div className='mt-10 box-border w-full max-w-[536px] rounded-3xl bg-white px-[60px] py-[48px] pb-[32px] shadow-[0_0_16px_8px_rgba(0,0,0,0.02)] xs:mt-0 xs:px-5 xs:py-8 xs:pb-[80px]'>
          {children}
        </div>
      </div>
    </div>
  </div>
);
