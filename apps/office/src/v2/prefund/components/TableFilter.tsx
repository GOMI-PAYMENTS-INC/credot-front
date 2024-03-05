import { ReactNode } from 'react';

export const TableFilter = ({
  amount,
  label,
  children,
}: {
  amount: number;
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className='mx-auto mt-[24px] flex w-[1280px] justify-between'>
      <div className='flex items-center'>
        <div className='mr-[20px] text-S/Regular text-grey-700'>{label}</div>
        <div className='text-XL/Bold text-purple-500'>{amount.toLocaleString()}원</div>
      </div>
      <div className='flex items-center'>
        <div className='mr-[11px] text-S/Regular text-grey-700'>선택 건</div>
        {children}
      </div>
    </div>
  );
};
