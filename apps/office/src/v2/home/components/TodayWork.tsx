import { Card } from 'antd';

import { HomeTitle } from '@/v2/home/components/HomeTitle';

export const TodayWork = () => {
  return (
    <div>
      <HomeTitle title='오늘 입출금 업무' />
      <div className='flex gap-x-6'>
        <Card className='min-w-[390px]'>
          <div className='text-L/Medium'>지급 대기 금액</div>
          <div className='mt-[14px] flex justify-between'>
            <div className='text-2XL/Bold text-purple-800'>45,000,000원</div>
            <div className='cursor-pointer self-end text-grey-600 underline'>
              지급하기
            </div>
          </div>
        </Card>
        <Card className='min-w-[390px]'>
          <div className='text-L/Medium'>지급 대기 금액</div>
          <div className='mt-[14px] flex justify-between'>
            <div className='text-2XL/Bold text-purple-800'>45,000,000원</div>
            <div className='cursor-pointer self-end text-grey-600 underline'>
              지급하기
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
