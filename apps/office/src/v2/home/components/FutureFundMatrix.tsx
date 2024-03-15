import { Card } from 'antd';

import { HomeTitle } from '@/v2/home/components/HomeTitle';
import { useFutureFundSummary } from '@/v2/home/hooks';

export const FutureFundMatrix = () => {
  const { data } = useFutureFundSummary();
  return (
    <div>
      <HomeTitle title='미래정산 주요 지표' />
      <div className='flex flex-col gap-x-6 gap-y-6'>
        <Card className='min-w-[530px]'>
          <div className='flex justify-between'>
            <div className='text-L/Medium'>누적 거래완료</div>
            <div className='text-XL/Bold text-purple-800'>
              {(data?.totalDoneCount || 0).toLocaleString()} 건
            </div>
          </div>
        </Card>

        <Card className='min-w-[530px]'>
          <div className='flex justify-between'>
            <div className='text-L/Medium'>누적 지급 금액</div>
            <div className='text-XL/Bold text-purple-800'>
              {(data?.totalFutureFundAmount || 0).toLocaleString()} 원
            </div>
          </div>
        </Card>

        <Card className='min-w-[530px]'>
          <div className='flex justify-between'>
            <div className='text-L/Medium'>누적 회수 금액</div>
            <div className='text-XL/Bold text-purple-800'>
              {(data?.totalReturnAmount || 0).toLocaleString()} 원
            </div>
          </div>
        </Card>

        <Card className='min-w-[530px]'>
          <div className='flex justify-between'>
            <div className='text-L/Medium'>누적 수익금</div>
            <div className='text-XL/Bold text-purple-800'>
              {(data?.totalProfit || 0).toLocaleString()} 원
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
