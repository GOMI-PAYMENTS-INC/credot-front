import { Card } from 'antd';

import { HomeTitle } from '@/v2/home/components/HomeTitle';

export const FutureFundMatrix = () => {
  return (
    <div>
      <HomeTitle title='미래정산 주요 지표' />
      <div className='flex flex-col gap-x-6 gap-y-6'>
        <Card className='min-w-[530px]'>
          <div className='flex justify-between'>
            <div className='text-L/Medium'>누적 거래완료</div>
            <div className='text-XL/Bold text-purple-800'>45,000,000원</div>
          </div>
        </Card>

        <Card className='min-w-[530px]'>
          <div className='flex justify-between'>
            <div className='text-L/Medium'>누적 지급 금액</div>
            <div className='text-XL/Bold text-purple-800'>45,000,000원</div>
          </div>
        </Card>

        <Card className='min-w-[530px]'>
          <div className='flex justify-between'>
            <div className='text-L/Medium'>누적 회수 금액</div>
            <div className='text-XL/Bold text-purple-800'>45,000,000원</div>
          </div>
        </Card>

        <Card className='min-w-[530px]'>
          <div className='flex justify-between'>
            <div className='text-L/Medium'>누적 수익금</div>
            <div className='text-XL/Bold text-purple-800'>45,000,000원</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
