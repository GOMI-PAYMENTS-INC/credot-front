import { useMemo, ReactNode } from 'react';

import { Common2Section, Common1Section } from '@/components/layouts';
import { TLayoutType } from '@/router/routeList';
import { Defalut } from '@/components/layouts/Defalut';
import { FindAccountLayout } from '@/components/layouts/FindAccountLayout';
interface LayoutProps {
  children?: ReactNode;
  layoutType: TLayoutType;
}
const Layout = ({ children, layoutType }: LayoutProps) => {
  const renderLayout = useMemo(() => {
    switch (layoutType) {
      case 'Common2Section':
        return <Common2Section>{children}</Common2Section>;
      case 'Common1Section':
        return <Common1Section>{children}</Common1Section>;
      case 'FindAccountLayout':
        return <FindAccountLayout>{children}</FindAccountLayout>;
      default:
        return <Defalut>{children}</Defalut>;
    }
  }, [layoutType]);

  return <main className='h-screen'>{renderLayout}</main>;
};

export default Layout;
