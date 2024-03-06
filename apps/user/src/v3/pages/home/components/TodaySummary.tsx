import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useTodayFutureFundHook } from '@/v3/pages/home/hooks/future-fund.hook';
import { useTodayPrefundHook } from '@/v3/pages/home/hooks/prefund.hook';

export const TodaySummary = () => {
  const { data: prefund } = useTodayPrefundHook();
  const { data: futureFund } = useTodayFutureFundHook();
  const navigation = useNavigate();

  const prefundPrice = prefund?.prefund || 0;
  const futureFundPrice = futureFund?.applyPrice || 0;
  return (
    <Row gutter={[30, 30]}>
      <Col className='flex w-[400px]'>
        <div className='mt-[14px] w-full rounded-[8px] border border-grey-200 py-[24px] px-[30px]'>
          <div className='text-L/Medium'>선정산금</div>
          <div className='flex w-full items-end justify-between'>
            <div className='mt-[14px] text-2XL/Bold text-purple-700'>
              {prefundPrice.toLocaleString()}원
            </div>
            <div
              className='cursor-pointer text-M/Medium text-grey-600'
              onClick={() => navigation('/history')}
            >
              상세 내역
            </div>
          </div>
        </div>
      </Col>
      <Col className='flex w-[400px]'>
        <div className='mt-[14px] w-full rounded-[8px] border border-grey-200 py-[24px] px-[30px]'>
          <div className='text-L/Medium'>미래정산금</div>
          <div className='flex w-full items-end justify-between'>
            <div className='mt-[14px] text-2XL/Bold text-purple-700'>
              {futureFundPrice.toLocaleString()}원
            </div>
            <div
              className='cursor-pointer text-M/Medium text-grey-600'
              onClick={() => navigation('/history')}
            >
              상세 내역
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
