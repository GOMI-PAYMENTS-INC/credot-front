import type { ReactNode } from 'react';
import { Default as Layout } from '@/common/layouts';

interface IPlanLayout {
  children: ReactNode;
}
export const PlanLayout = ({ children }: IPlanLayout) => {
  return (
    <Layout useGap={true}>
      <section className='pb-[164px]'>
        <div className='absolute left-0 top-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />
        <div className='absolute right-0 bottom-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />
        {children}
      </section>
    </Layout>
  );
};
