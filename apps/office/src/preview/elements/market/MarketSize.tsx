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
      <div className='grid grid-cols-10 border-t-[2px] border-b-[1px] border-grey-300 xs:mt-6 xs:flex xs:flex-col'>
        <div className='border-grey-30 relative col-span-10 flex w-full items-center border-b-[1px] bg-grey-100'>
          <h1 className='flex items-center py-2.5 pl-5 text-S/Medium text-grey-900'>
            검색트렌드
            <span className='pl-[4px] text-XS/Medium text-grey-700'>
              {lastYearToCreated}_google 싱가포르
            </span>
          </h1>
        </div>

        <div className='col-span-2 flex min-h-[320px] flex-col justify-center pl-5 text-S/Medium text-grey-800  xs:hidden xs:text-S/Regular'>
          <div className='mt-5 flex min-h-[140px] flex-col justify-center border-r-[1px] border-dashed pb-3'>
            <p>가장 많이 팔려요</p>
            <p className='pt-2 text-2XL/Bold text-[#FF5100]'>05월</p>
          </div>
          <div className='mb-5 flex min-h-[140px] flex-col justify-center border-t-[1px] border-r-[1px] border-dashed '>
            <p>가장 적게 팔려요</p>
            <ul className='flex flex-wrap'>
              <li className='basis-1/2 pt-2 text-2XL/Bold text-grey-900'>06월</li>
              <li className='basis-1/2 pt-2 text-2XL/Bold text-grey-900'>12월</li>
            </ul>
          </div>
        </div>
        <div className='col-span-8 flex h-[320px] w-full flex-col items-center text-S/Medium text-grey-800 xs:text-S/Regular'>
          <div className='h-full w-full max-w-[710px] py-5'>
            <MarketSizeTrendChart trendData={{ interest, date }} />
          </div>
        </div>
      </div>
      <div className='col-span-12 hidden min-h-[50px] justify-around px-5 py-[14px] pl-5 text-center text-L/Bold xs:flex'>
        <div className=' flex w-1/2 flex-col justify-center'>
          <div className='flex w-[144px] flex-wrap justify-center gap-x-1 self-center'>
            {[6].map((month, key) => (
              <p key={`max_turn_over_${key}`} className='text-L/Bold text-[#FF5100]'>
                {`${month}월`}
              </p>
            ))}
          </div>
          <p className='text-S/Regular text-grey-800'>가장 많이 팔려요</p>
        </div>

        <div className='flex w-1/2 flex-col justify-center'>
          <div className='flex w-[144px] flex-wrap justify-center gap-x-1 self-center'>
            {[6, 12].map((month, key) => (
              <p key={`min_turn_over_${key}`} className=' text-L/Bold text-grey-900'>
                {`${month}월`}
              </p>
            ))}
          </div>
          <p className='text-S/Regular text-grey-800'>가장 적게 팔려요</p>
        </div>
      </div>
      <div className='border-grey-30 flex w-full border-t-[2px] border-b-[1px] xs:flex-col'>
        <div className='w-1/2 xs:w-full xs:border-b-[1px]'>
          <div className='h-10 w-full bg-grey-100 pl-5 text-left xs:border-b-[1px]'>
            <h1 className='pt-2.5 text-S/Medium text-grey-900 xs:text-S/Regular'>매출</h1>
          </div>
          <div className='my-7 flex xs:text-center'>
            <div className='ml-5 w-1/2 xs:ml-0'>
              <p className='text-S/Medium text-grey-800 xs:hidden'>매출 합계</p>
              <div className='mt-2 flex items-center xs:justify-center'>
                <span className='mr-1 text-2XL/Bold text-grey-900 xs:text-L/Bold'>
                  {totalAmount}
                </span>
                <span className='text-L/Medium text-grey-800'>원</span>
              </div>
              <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>
                매출 합계
              </p>
            </div>

            <div className='w-1/2 border-l-[1px] border-dashed pl-5 xs:pl-0'>
              <p className='text-S/Medium text-grey-800 xs:hidden'>평균 매출</p>
              <div className='mt-2 flex items-center xs:justify-center'>
                <span className='mr-1 text-2XL/Regular text-grey-900 xs:text-L/Regular'>
                  {avgAmount}
                </span>
                <span className='text-L/Medium text-grey-800'>원</span>
              </div>
              <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>
                평균 매출
              </p>
            </div>
          </div>
        </div>

        <div className='w-1/2 border-l-[1px] xs:mt-[30px] xs:w-full xs:border-l-0 xs:border-t-[2px]'>
          <div className='h-10 w-full bg-grey-100 text-left  xs:border-b-[1px]'>
            <h1 className='pt-2.5 pl-5 text-S/Medium text-grey-900 xs:text-S/Regular'>
              판매량
            </h1>
          </div>
          <div className='my-7 flex xs:text-center'>
            <div className='ml-5 w-1/2 xs:ml-0'>
              <p className='text-S/Medium text-grey-800 xs:hidden'>판매량 합계</p>
              <div className='mt-2 flex items-center xs:justify-center'>
                <span className='mr-1 text-2XL/Regular text-grey-900 xs:text-L/Regular'>
                  {totalCount}
                </span>
                <span className='text-L/Medium text-grey-800'>개</span>
              </div>
              <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>
                판매량 합계
              </p>
            </div>
            <div className='w-1/2 border-l-[1px] border-dashed pl-5 xs:pl-0'>
              <p className='text-S/Medium text-grey-800 xs:hidden'>평균 판매량</p>
              <div className='mt-2 flex items-center xs:justify-center'>
                <span className='mr-1 text-2XL/Regular text-grey-900 xs:text-L/Regular'>
                  {avgCount}
                </span>
                <span className='text-L/Medium text-grey-800'>개</span>
              </div>
              <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>
                평균 판매량
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
