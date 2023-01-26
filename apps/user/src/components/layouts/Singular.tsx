import { ReactNode } from 'react';

import { authTokenStorage } from '@/utils/auth-token';

export interface ISingularProps {
  children?: ReactNode;
}
export const Singular = ({ children }: ISingularProps) => {
  const isLogin = authTokenStorage.getToken() !== null;
  const size = isLogin
    ? 'relative -top-20 w-[67%]'
    : 'mt-[11.56vh] w-full max-w-[26.25rem]';
  return (
    <div className='flex h-screen w-full justify-center'>
      <div className={size}>{children}</div>
    </div>
  );
};
