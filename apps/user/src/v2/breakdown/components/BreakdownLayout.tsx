import { ReactNode } from 'react';

export const BreakdownLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full ${className || ''}`}>
      <div className='mx-auto max-w-[1280px]'>{children}</div>
    </div>
  );
};
