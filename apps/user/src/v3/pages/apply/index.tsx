import { Layout } from 'antd';
import { isMobile } from 'react-device-detect';
import { ReactSVG } from 'react-svg';

import { Default } from '@/v3/layouts';
import { ApplyFormCard, MApplyFormCard } from '@/v3/pages/apply/components';

const { Header, Content } = Layout;

function PCApply() {
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
}

export const MApply = () => {
  return (
    <Default>
      <MApplyFormCard />
    </Default>
  );
};

export const Apply = () => {
  return isMobile ? <MApply /> : <PCApply />;
};
