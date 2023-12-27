import { HistoryOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

import { Header } from '@/v3/components';
import { ContentLayout } from '@/v3/layouts';
import { PeriodPreFund, PreFundHistory } from '@/v3/pages/history/components';

export const PCHistory = () => {
  return (
    <div className='w-full'>
      <ContentLayout>
        <div className='pt-[63px]'>
          <Header
            icon={
              <span className='text-2XL/Bold'>
                <HistoryOutlined />
              </span>
            }
            title='서비스 이용내역'
          />
        </div>
        {<PeriodPreFund />}
        <Divider className='mt-[70px]' />
        {<PreFundHistory />}
      </ContentLayout>
    </div>
  );
};
