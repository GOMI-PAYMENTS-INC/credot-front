import { Layout } from 'antd';
import { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';

import { SideBar } from '@/v3/layouts/SideBar';

interface IDefaultProps {
  children?: ReactNode;
  sideBar?: boolean;
}

const { Sider, Content } = Layout;

export const Default = ({ children, sideBar = true }: IDefaultProps) => {
  return (
    <Layout className={`min-h-screen bg-transparent ${isMobile ? '!flex-col' : ''}`}>
      {
        <Sider
          className={`!bg-transparent ${
            isMobile ? '!w-full !max-w-full !flex-none' : ''
          }`}
        >
          <SideBar sideBar={sideBar} />
        </Sider>
      }
      <Content>{children}</Content>
    </Layout>
  );
};
