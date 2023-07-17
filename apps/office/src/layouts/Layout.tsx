import { Fragment, ReactNode } from 'react';

import { Footer, Header } from '@/layouts/elements';

interface LayoutProps {
  children?: ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <Fragment>
    <Header />
    <div className='mt-20'>{children}</div>
    <Footer />
  </Fragment>
);
export default Layout;
