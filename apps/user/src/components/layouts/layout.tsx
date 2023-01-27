import type { ComponentType } from 'react';
import { createElement, Fragment, ReactNode } from 'react';

// import { IPluralProps, ISingularProps } from '@/components/layouts';
import SideBar from '@/components/layouts/SideBar';
import { authTokenStorage } from '@/utils/auth-token';

interface LayoutProps {
  children?: ReactNode;
  pathname: string;
  layoutComponent: ComponentType;
}
const Layout = ({ children, layoutComponent }: LayoutProps) => {
  const isLogin = authTokenStorage.getToken() !== null;
  console.log(layoutComponent, 'comp');
  return (
    <main className='flex h-full w-full items-center'>
      {isLogin ? (
        <Fragment>
          <SideBar />
          <div className='flex w-5/6'>{createElement(layoutComponent)}</div>
        </Fragment>
      ) : (
        <Fragment>{createElement(layoutComponent)}</Fragment>
      )}
      {children}
    </main>
  );
};
export default Layout;
