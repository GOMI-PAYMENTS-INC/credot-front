import { Fragment, ReactNode } from 'react';

import { Common2Section, Common1Section } from '@/components/layouts';
import { TLayoutType } from '@/router/routeList';
import { Defalut } from '@/components/layouts/Defalut';

interface LayoutProps {
  children?: ReactNode;
  isLogin: boolean;
  layoutType: TLayoutType;
}
const Layout = ({ children, isLogin, layoutType }: LayoutProps) => (
  <main className='h-full w-full'>
    {(() => {
      switch (layoutType) {
        case 'Common2Section':
          return <Common2Section>{children}</Common2Section>;
        case 'Common1Section':
          return <Common1Section>{children}</Common1Section>;
        default:
          return <Defalut>{children}</Defalut>;
      }
    })()}
  </main>
);

export default Layout;
