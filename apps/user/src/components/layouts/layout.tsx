import { Fragment, ReactNode } from 'react';

import { Plural, Singular } from '@/components/layouts';
import SideBar from '@/components/layouts/SideBar';
import { TLayoutType } from '@/router/routeList';

interface LayoutProps {
  children?: ReactNode;
  isLogin: boolean;
  layoutType: TLayoutType;
}
const Layout = ({ children, isLogin, layoutType }: LayoutProps) => (
  <main className='flex h-full w-full items-center'>
    {isLogin ? (
      <Fragment>
        <SideBar />
        <div className='flex h-[100%] w-[100%]'>
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

export default Layout;
