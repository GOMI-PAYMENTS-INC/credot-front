import { ReactNode } from 'react';

export interface ICommon2SectionProps {
  children: ReactNode;
}

export const Common2Section = ({ children }: ICommon2SectionProps) => (
  <main>
    <div className='h-screen md:h-full'>
      <div className='h-full'>
        <div className='container-common h-full'>
          <div className='flex h-full w-full items-center justify-center'>
            <div className='grid grid-cols-12 gap-x-6 md:flex'>
              <div className='col-span-5 col-start-2 md:hidden'>
                <img src='/assets/images/LoginInfoImg1.png' alt='' />
              </div>

              <div className='col-span-5 flex flex-col rounded-3xl px-[60px] pt-12 '>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);
