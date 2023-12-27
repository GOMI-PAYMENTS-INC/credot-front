import { ReactNode } from 'react';

interface IContentLayoutProps {
  children?: ReactNode;
}

export const ContentLayout = ({ children }: IContentLayoutProps) => {
  return <div className='ml-[249px] w-[1079px]'>{children}</div>;
};
