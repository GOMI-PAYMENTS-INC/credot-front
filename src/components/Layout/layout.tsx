import { ReactNode } from 'react';

import Footer from '@/components/Layout/footer';
import Header from '@/components/Layout/header';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
