import { ReactNode } from 'react';

export const Header = ({ icon, title }: { icon: ReactNode; title: string }) => {
  return (
    <div className='flex'>
      <div className='h-[30px] w-[30px] rounded-[50%] bg-[#FFD873] text-center leading-[30px]'>
        {icon}
      </div>
      <div className='ml-[14px] text-2XL/Bold text-white'>{title}</div>
    </div>
  );
};
