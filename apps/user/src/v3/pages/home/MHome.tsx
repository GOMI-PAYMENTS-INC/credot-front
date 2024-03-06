import {
  FutureFundChart,
  PrefundSummary,
  PrefundTable,
} from '@/v3/pages/home/components';

export const MHome = () => {
  return (
    <>
      <div className='mt-[50px] h-full w-full'>
        <div className='pl-[20px] text-L/Bold text-grey-800'>오늘 입금 내역</div>
        <div className='mt-[14px] w-full px-[21px]'>
          <PrefundSummary />
        </div>
        <div className='mt-[52px] pl-[20px] text-L/Bold text-grey-800'>
          미래정산 신청가능 금액
        </div>
        <div className='mt-[14px] w-full px-[21px]'>
          <FutureFundChart />
        </div>
        <div className='mt-[52px] pl-[20px] text-L/Bold text-grey-800'>
          오늘 카드사별 선정산 내역
        </div>
        <div className='mt-[28px] w-full px-[21px]'>
          <PrefundTable />
        </div>
      </div>
    </>
  );
};
