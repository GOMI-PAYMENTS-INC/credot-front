import { ReactNode } from 'react';

export interface IPluralProps {
  children?: ReactNode;
}

export const Plural = ({ children }: IPluralProps) => (
  <div className='container'>
    <div className='grid min-w-[1320px] grid-cols-12 gap-x-6'>{children}</div>
  </div>
);
