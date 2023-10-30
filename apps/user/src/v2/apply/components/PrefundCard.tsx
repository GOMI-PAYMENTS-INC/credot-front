import { ReactNode } from 'react';

export const PrefundCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <>
      <div className='flex w-full flex-row'>
        <div className='h-[52px] w-[299px] basis-1/3 rounded-t-[8px] bg-grey-700 py-[12px] text-center text-XL/Bold text-white'>
          {title}
        </div>
      </div>
      <div className='flex h-[110px] flex-row items-center justify-between rounded-b-[8px] rounded-r-[8px] bg-white px-[53px] py-[21px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
        {children}
      </div>
    </>
  );
};
