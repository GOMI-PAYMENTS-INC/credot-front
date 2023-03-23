import { Fragment, ReactNode } from 'react';

import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { IRoute } from '@/types/paths';

interface LayoutProps {
  route: IRoute;
  children?: ReactNode;
}
const Layout = ({ route, children }: LayoutProps) => (
  <Fragment>
    <Header route={route} />
    <div className='mt-20'>{children}</div>
    <Footer />
  </Fragment>
);
export default Layout;
