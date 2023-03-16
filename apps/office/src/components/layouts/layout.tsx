import { ReactNode } from 'react';

import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

interface LayoutProps {
  children?: ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <div className='mt-20'>{children}</div>
    <Footer />
  </>
);
export default Layout;
