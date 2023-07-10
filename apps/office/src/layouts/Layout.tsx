import { Fragment, ReactNode } from 'react';

import { Footer, Header } from '@/layouts/elements';
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
