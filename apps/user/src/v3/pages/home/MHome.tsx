import { PrefundSummary, PrefundTable, PrefundView } from '@/v3/pages/home/components';

export const MHome = () => {
  return (
    <>
      <div className='bg-purple-600'>
        <PrefundView />
      </div>
      <div className='mt-[50px] w-full'>
        <div className='pl-[20px] text-L/Bold text-grey-800'>오늘 선정산 현황</div>
        <div className='mt-[14px] w-full'>
          <PrefundSummary />
        </div>
        <div className='mt-[52px] text-center text-L/Bold text-grey-700'>
          카드사별 내역
        </div>
        <div className='mt-[28px] w-full'>
          <PrefundTable />
        </div>
        <div className='mt-[56px] pl-[20px] text-L/Bold text-grey-800'>
          오늘 선정산 현황
        </div>
      </div>
    </>
  );
};
