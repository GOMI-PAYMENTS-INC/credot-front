import { ReactNode } from 'react';

import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <main className='mt-[-5rem]'>{children}</main>
    <Footer />
  </>
);

export default Layout;
