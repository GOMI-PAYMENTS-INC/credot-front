import { ReactNode } from 'react';
import { ReactSVG } from 'react-svg';
export interface ICommon2SectionProps {
  children: ReactNode;
}

export const Common2Section = ({ children }: ICommon2SectionProps) => (
  <main>
    <div className='hidden w-full justify-center md:flex'>
      <ReactSVG
        src='/assets/icons/Logo.svg'
        className='fixed top-0 z-20 border-b-[1px] border-grey-300 bg-white py-5 px-[640px]'
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'w-[124px] h-6');
        }}
      />
    </div>

    <div className='h-screen md:h-full'>
      <div className='h-full'>
        <div className='container-common h-full'>
          {/* TODO: md:items-baseline 으로 변경하기 */}
          <div className='flex h-full w-full items-center justify-center md:items-baseline xs:items-center'>
            <div className='grid grid-cols-12 gap-x-6 md:flex'>
              <div className='col-span-5 col-start-2 md:hidden'>
                <img src='/assets/images/LoginInfoImg1.png' alt='' />
              </div>

              <div className='col-span-5 flex flex-col rounded-3xl px-[60px] pt-12 md:w-[400px] md:px-[30px] sm:w-[340px] xs:px-0'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);
