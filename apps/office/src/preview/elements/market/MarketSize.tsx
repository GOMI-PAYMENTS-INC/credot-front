import { MarketSizeTrendChart } from '@/preview/elements/market/MarketSizeTrendChart';
import {
  convertedGoogleTrendData,
  convertExchangeRate,
  formatNumber,
} from '@/preview/container';

import { DetailReportSectionHeader } from '@/preview/elements';
import { REPORT_CONTENT } from '@/preview/constants/reportData';
import { MAIN_DATA } from '@/preview/constants/constant';

export const MarketSize = () => {
  const {
    totalSalesAmount,
    avgSalesAmount,
    totalSalesCount,
    avgSalesCount,
    currencyUnit,
    basePrice,
    trend,
  } = MAIN_DATA;

  const { interest, date } = convertedGoogleTrendData(trend);

  const created = 2023;
  const lastYearToCreated = created - 1;

  const [totalAmount, avgAmount, totalCount, avgCount] = [
    totalSalesAmount,
    avgSalesAmount,
    totalSalesCount,
    avgSalesCount,
  ]
    .map((number, idx) => {
      if (idx > 1) return number;
      return convertExchangeRate(currencyUnit, number, basePrice);
    })
    .map((number) => formatNumber(number));

  return (
    <section className='mt-[30px]'>
      <DetailReportSectionHeader id={REPORT_CONTENT.MARKET} />
      <div className='grid grid-cols-10'>
        <div className='border-grey-30 relative col-span-10 flex w-full items-center border-b-[1px] bg-grey-100'>
          <h1 className='flex items-center py-2.5 pl-5 text-S/Medium text-grey-900'>
            검색트렌드
            <span className='pl-[4px] text-XS/Medium text-grey-700'>
              {lastYearToCreated}_google 싱가포르
            </span>
          </h1>
        </div>

        <div className='col-span-2 flex min-h-[320px] flex-col justify-center pl-5 text-S/Medium  text-grey-800'>
          <div className='mt-5 flex min-h-[140px] flex-col justify-center border-r-[1px] border-dashed pb-3'>
            <p>가장 많이 팔려요</p>
            <p className='pt-2 text-2XL/Bold text-[#FF5100]'>05월</p>
          </div>
          <div className='mb-5 flex min-h-[140px] flex-col justify-center border-t-[1px] border-r-[1px] border-dashed pt-5 '>
            <p>가장 적게 팔려요</p>
            <ul className='flex flex-wrap'>
              <li className='basis-1/2 pt-2 text-2XL/Bold text-grey-900'>12월</li>
            </ul>
          </div>
        </div>
        <div className='col-span-8 flex h-[320px] w-full flex-col items-center text-S/Medium text-grey-800'>
          <div className='h-full w-full max-w-[710px] py-5'>
            <MarketSizeTrendChart trendData={{ interest, date }} />
          </div>
        </div>
      </div>

      <div className='border-grey-30 flex w-full border-t-[1px] border-b-[1px] '>
        <div className='w-1/2'>
          <div className='h-10 w-full bg-grey-100 pl-5 text-left '>
            <h1 className='pt-2.5 text-S/Medium text-grey-900'>매출</h1>
          </div>
          <div className='my-7 flex'>
            <div className='ml-5 w-1/2'>
              <p className='text-S/Medium text-grey-800'>매출 합계</p>
              <div className='mt-2 flex items-center '>
                <span className='mr-1 text-2XL/Bold text-grey-900'>{totalAmount}</span>
                <span className='text-L/Medium text-grey-800'>원</span>
              </div>
            </div>
            <div className='w-1/2 border-l-[1px] border-dashed pl-5'>
              <p className='text-S/Medium text-grey-800'>평균 매출</p>
              <div className='mt-2 flex items-center '>
                <span className='mr-1 text-2XL/Regular text-grey-900'>{avgAmount}</span>
                <span className='text-L/Medium text-grey-800'>원</span>
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2 border-l-[1px]'>
          <div className='h-10 w-full bg-grey-100 text-left'>
            <h1 className='pt-2.5 pl-5 text-S/Medium text-grey-900'>판매량</h1>
          </div>
          <div className='my-7 flex'>
            <div className='ml-5 w-1/2'>
              <p className='text-S/Medium text-grey-800'>판매량 합계</p>
              <div className='mt-2 flex items-center '>
                <span className='mr-1 text-2XL/Regular text-grey-900'>{totalCount}</span>
                <span className='text-L/Medium text-grey-800'>개</span>
              </div>
            </div>
            <div className='w-1/2 border-l-[1px] border-dashed pl-5'>
              <p className='text-S/Medium text-grey-800'>평균 판매량</p>
              <div className='mt-2 flex items-center '>
                <span className='mr-1 text-2XL/Regular text-grey-900'>{avgCount}</span>
                <span className='text-L/Medium text-grey-800'>개</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
