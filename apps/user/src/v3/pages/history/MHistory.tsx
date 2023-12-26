import { HistoryOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

import { Header } from '@/v3/components';
import { PeriodPreFund, PreFundHistory } from '@/v3/pages/history/components';

export const MHistory = () => {
  return (
    <div className='w-full'>
      <div className='px-[16px] pt-[63px]'>
        <Header
          icon={
            <span className='text-2XL/Bold'>
              <HistoryOutlined />
            </span>
          }
          title='서비스 이용내역'
        />
        <div className='mt-[40px]'>
          <PeriodPreFund />
        </div>
        <div className='mt-[40px]'>
          <Divider />
        </div>
        <div className='my-[40px]'>
          <PreFundHistory />
        </div>
      </div>
    </div>
  );
};
