import { Fragment, ReactNode, useEffect, useState } from 'react';

import { Plural, Singular } from '@/components/layouts';
import SideBar from '@/components/layouts/SideBar';
import { getComponentByPathname, TLayoutType } from '@/router/routeList';
import { authTokenStorage } from '@/utils/auth-token';

interface LayoutProps {
  children?: ReactNode;
  pathname: string;
}
const Layout = ({ children, pathname }: LayoutProps) => {
  const isLogin = authTokenStorage.getToken() !== null;
  const [layoutType, setLayoutType] = useState<TLayoutType>('Plural');

  useEffect(() => {
    setLayoutType(getComponentByPathname(pathname));
  }, [pathname]);

  return (
    <main className='flex h-full w-full items-center'>
      {isLogin ? (
        <Fragment>
          <SideBar />
          <div className='flex w-5/6'>
            {layoutType === 'Plural' ? (
              <Plural>{children}</Plural>
            ) : (
              <Singular>{children}</Singular>
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {layoutType === 'Plural' ? (
            <Plural>{children}</Plural>
          ) : (
            <Singular>{children}</Singular>
          )}
        </Fragment>
      )}
    </main>
  );
};
export default Layout;
