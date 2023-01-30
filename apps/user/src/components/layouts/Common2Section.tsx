import { ReactNode } from 'react';

export interface ICommon2SectionProps {
  children: ReactNode;
}

export const Common2Section = ({ children }: ICommon2SectionProps) => (
  <div className='flex h-full w-full items-center justify-center'>
    <div className='container'>
      <div className='grid min-w-[1320px] grid-cols-12 gap-x-6'>{children}</div>
    </div>
  </div>
);
