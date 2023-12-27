import { Layout } from 'antd';
import { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';

import { SideBar } from '@/v3/layouts/SideBar';

interface IDefaultProps {
  children?: ReactNode;
}

const { Sider, Content } = Layout;

export const Default = ({ children }: IDefaultProps) => {
  return (
    <Layout className={`h-full bg-transparent ${isMobile ? '!flex-col' : ''}`}>
      <Sider
        className={`!bg-transparent ${isMobile ? '!w-full !max-w-full !flex-none' : ''}`}
      >
        <SideBar />
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
};
