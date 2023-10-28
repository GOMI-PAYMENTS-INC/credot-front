import { BreakdownLayout } from '@/v2/breakdown/components/BreakdownLayout';

export const Title = () => {
  return (
    <BreakdownLayout className='bg-grey-50 py-[75px]'>
      <div className='text-3XL/Bold text-grey-900'>조회하기</div>
      <div className='mt-[17px] text-L/Medium text-grey-700'>
        서비스를 이용하신 내역이에요.
      </div>
    </BreakdownLayout>
  );
};
