import { ReactNode } from 'react';

import Footer from '@/components/layouts/footer';
import Header, { HeaderProps } from '@/components/layouts/header';

interface LayoutProps {
  children?: ReactNode;
  headerChildren: HeaderProps;
}
const Layout = ({ children, headerChildren }: LayoutProps) => (
  <>
    {/* <Header onLogout={headerChildren.onLogout} isLogin={headerChildren.isLogin} /> */}
    <main className='flex w-full h-full items-center'>{children}</main>
    {/* <Footer /> */}
  </>
);
export default Layout;
