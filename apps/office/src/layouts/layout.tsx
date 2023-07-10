import { Fragment, ReactNode } from 'react';

import Footer from '@/layouts/elements/footer';
import Header from '@/layouts/elements/header';
import { IRoute } from '@/router/paths';

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
