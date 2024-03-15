import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

import { HomeTitle } from '@/v2/home/components/HomeTitle';
import { useHomeToday } from '@/v2/home/hooks';

export const TodayWork = () => {
  const navigation = useNavigate();
  const { data } = useHomeToday();
  return (
    <div>
      <HomeTitle title='오늘 입출금 업무' />
      <div className='flex gap-x-6'>
        <Card className='min-w-[390px]'>
          <div className='text-L/Medium'>지급 대기 금액</div>
          <div className='mt-[14px] flex justify-between'>
            <div className='text-2XL/Bold text-purple-800'>
              {(data?.depositPrice || 0).toLocaleString()} 원
            </div>
            <div
              className='cursor-pointer self-end text-grey-600 underline'
              onClick={() => navigation('/prefund/ready')}
            >
              지급하기
            </div>
          </div>
        </Card>
        <Card className='min-w-[390px]'>
          <div className='text-L/Medium'>회수 대기 금액</div>
          <div className='mt-[14px] flex justify-between'>
            <div className='text-2XL/Bold text-purple-800'>
              {(data?.returnPrice || 0).toLocaleString()} 원
            </div>
            <div
              className='cursor-pointer self-end text-grey-600 underline'
              onClick={() => navigation('/prefund/deposit-done')}
            >
              회수하기
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
