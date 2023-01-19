import { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <>
    {/* <Header onLogout={headerChildren.onLogout} isLogin={headerChildren.isLogin} /> */}
    <main className='flex h-full w-full items-center'>{children}</main>
    {/* <Footer /> */}
  </>
);
export default Layout;
