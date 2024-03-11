import { ReactNode } from 'react';

export const Header = ({
  title,
  children,
}: {
  title: string;
  updateAt: string;
  children?: ReactNode;
}) => {
  return (
    <div className='mx-auto flex w-[1280px] items-center'>
      <div className='mr-[20px] text-XL/Bold text-grey-900'>{title}</div>
      <div>{children}</div>
    </div>
  );
};
