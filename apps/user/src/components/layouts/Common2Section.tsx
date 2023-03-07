import { ReactNode } from 'react';

export interface ICommon2SectionProps {
  children: ReactNode;
}

export const Common2Section = ({ children }: ICommon2SectionProps) => (
  <div className='h-screen'>
    <div className='h-full'>
      <div className='container-common h-full  w-full '>
        <div className='flex h-full w-full items-center justify-center'>
          <div className='grid grid-cols-12 gap-x-6'>
            {/*좌측 이미지 시작*/}
            <div className='col-span-5 col-start-2'>
              <img src='../../assets/images/LoginInfoImg1.png' alt='' />
            </div>
            {/*좌측 이미지 끝*/}

            {/*우측 컨텐츠 시작*/}
            <div className='col-span-5 flex flex-col rounded-3xl px-[60px] pt-12'>
              {children}
            </div>
            {/*우측 컨텐츠 끝*/}
          </div>
        </div>
      </div>
    </div>
  </div>
);
