import './styles/ServiceBenefit.css';

import { Layout } from 'antd';
import { ReactSVG } from 'react-svg';

import {
  Customer,
  CustomerType,
  Intro,
  LandingMenu,
  ServiceFee,
  ServicePreview,
} from '@/v3/pages/landing/components';
import { ServiceBenefit } from '@/v3/pages/landing/components/ServiceBenefit';

const { Header, Content, Footer } = Layout;

export const Landing = () => {
  return (
    <Layout className='h-full bg-transparent'>
      <Header className='flex items-center border-b border-grey-300 bg-transparent'>
        <ReactSVG
          src='/assets/logo.svg'
          className='cursor-pointer'
          beforeInjection={(svg) => {
            svg.setAttribute('class', 'w-[107px] mx-auto');
          }}
        />
        <div className='ml-[97px]'>
          <LandingMenu />
        </div>
      </Header>
      <div className='h-auto'>
        <Content className='h-full'>
          <Intro />
          <Customer />
          <CustomerType />
          <ServicePreview />
          <ServiceBenefit />
          <ServiceFee />
        </Content>
      </div>
      <Footer>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  );
};
