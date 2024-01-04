import { Layout } from 'antd';
import { ReactSVG } from 'react-svg';

import { ApplyFormCard } from '@/v3/pages/apply/components';

const { Header, Content } = Layout;

export const Apply = () => {
  return (
    <Layout className='bg-transparent'>
      <Header className='h-auto border-b border-grey-300 bg-white py-[24px]'>
        <div className='mx-auto flex  w-[1100px] items-center justify-center'>
          <ReactSVG
            src='/assets/en-logo.svg'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'w-[140px] mx-auto');
            }}
          />
        </div>
      </Header>
      <Content className='!h-screen bg-grey-50'>
        <ApplyFormCard />
      </Content>
    </Layout>
  );
};
