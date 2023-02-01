import { ReactNode } from 'react';

export interface ICommon2SectionProps {
  children: ReactNode;
}

export const Common2Section = ({ children }: ICommon2SectionProps) => (
  <div className='h-full'>
    <div className='container h-full  w-full '>
      <div className='flex h-full w-full items-center justify-center'>
        <div className='grid grid-cols-12 gap-x-6'>{children}</div>
      </div>
    </div>
  </div>
);
