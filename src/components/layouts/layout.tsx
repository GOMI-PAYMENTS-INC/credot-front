import { ReactNode } from 'react';

import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

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
