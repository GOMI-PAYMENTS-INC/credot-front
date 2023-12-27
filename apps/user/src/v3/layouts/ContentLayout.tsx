import { ReactNode } from 'react';

interface IContentLayoutProps {
  children?: ReactNode;
}

export const ContentLayout = ({ children }: IContentLayoutProps) => {
  return <div className='mx-auto w-[1079px] px-[20px]'>{children}</div>;
};
