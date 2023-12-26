import { ReactNode } from 'react';

export const Header = ({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string | ReactNode;
}) => {
  return (
    <div className='flex'>
      <div className='self-center text-purple-600'>{icon}</div>
      <div className={`ml-[14px] text-2XL/Bold text-purple-600`}>{title}</div>
    </div>
  );
};
