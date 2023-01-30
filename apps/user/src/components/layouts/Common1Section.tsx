import { ReactNode } from 'react';

import { authTokenStorage } from '@/utils/auth-token';
import {ICommon2SectionProps} from "@/components/layouts/Common2Section";

export interface ICommon1SectionProps {
  children?: ReactNode;
}
export const Common1Section = ({ children }: ICommon1SectionProps) => (
  <div  className='flex h-full w-full items-center justify-center'>
    <div className='container'>
      <div className='grid min-w-[1320px] grid-cols-12 gap-x-6'>{children}</div>
    </div>
  </div>
);
