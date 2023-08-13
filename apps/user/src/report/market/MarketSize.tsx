import { useState } from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { convertedGoogleTrendData, convertExchangeRate } from '@/report/container';
import { TITLE } from '@/types/enum.code';

import { MarketSizeTrendChart } from '@/report/market/MarketSizeTrendChart';
import { isFalsy } from '@/utils/isFalsy';
import { _amplitudeMovedToUserGuide } from '@/amplitude/amplitude.service';

import { DetailReportSectionHeader } from '@/report/elements';
import { dateConvertor } from '@/report/market/container';
import UseTooltip from '@/components/UseTooltip';
import {
  SearchTrend,
  TotalSales,
  TotalSalesAvg,
  TotalAmount,
  TotalAmountAvg,
} from '@/report/market/ToolTip';
interface IMarketSize {
  marketSize: TMarketSize & { text: string; itemCount: number };
}

export const MarketSize = (props: IMarketSize) => {
  const {
    totalSalesAmount,
    avgSalesAmount,
    totalSalesCount,
    avgSalesCount,
    basePrice,
    currencyUnit,
    country,
    trend,
    itemCount,
    text,
  } = props.marketSize;

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
  const YEARS = [0, 2021, 2022, 2023];
  const trendDate = trend.map((el) => el.trendDate.toString());
  const haveAllTrend = YEARS.filter((year) => year !== 0).every((year) =>
    trendDate.some((date) => date.includes(`${year}`)),
  );

  const [isSelected, setIsSelected] = useState<number>(haveAllTrend ? 2023 : 2022);
  const isDateAll = isSelected === 0;

  const _trend = isDateAll
    ? trend
    : trend.filter((data) => data.trendDate.toString().includes(`${isSelected}`));
  const { interest, date, minMonth, maxMonth } = convertedGoogleTrendData(
    _trend,
    isSelected,
  );
  const [_minMonth, minCount] = minMonth;
  const [_maxMonth, maxCount] = maxMonth;

  return (
    <section>
      <DetailReportSectionHeader id={TITLE.MARKET_SIZE} />

      <div className='pt-6'>
        {isFalsy(trend) === false && (
          <div className='grid grid-cols-10 border-t-[1px] border-b-[1px] border-grey-300'>
            <div className='border-grey-30 relative col-span-10 flex w-full items-center border-t-[1px] border-b-[1px] bg-grey-100'>
              <h1 className='flex items-center py-2.5 pl-5 text-S/Medium text-grey-900'>
                검색량 추이
              </h1>
              <UseTooltip content={SearchTrend({ country, text })} />
            </div>
            <header className='col-span-10 flex w-full py-5'>
              <div
                id='google_trend_header'
                className='xs:justify-cetner flex w-full items-center justify-between xs:flex-col'
              >
                <div className='pl-[48px] xs:pl-0 '>
                  <ul className='flex divide-x-[1px] border-[1px]'>
                    {[0, 2021, 2022, 2023].map((year, index) => {
                      const borderCss =
                        isSelected === year
                          ? 'border-orange-400 bg-orange-100 text-orange-400'
                          : 'border-grey-300 text-grey-900';

                      const trendCss =
                        year === 2022 ? 'cursor-default' : 'bg-grey-400 cursor-default';

                      const text = year === 0 ? '전체' : year;
                      return (
                        <li
                          key={`google_trend_${index}`}
                          onClick={() => {
                            if (haveAllTrend === false) return;
                            setIsSelected(year);
                          }}
                        >
                          <div
                            className={`${borderCss} flex h-11 w-[86px] cursor-pointer items-center justify-center text-M/Medium xs:w-20 ${
                              haveAllTrend === false && trendCss
                            }`}
                          >
                            {text}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className='mr-2.5 flex divide-x-[1px] divide-dotted border-[1px] border-grey-300 text-S/Medium text-grey-800 xs:mt-5 xs:mr-0 '>
                  <div className='flex w-full min-w-[180px] flex-col py-3 pl-5 xs:min-w-[160px]'>
                    <p>가장 많이 팔렸어요</p>
                    <p className='pt-2 text-2XL/Bold text-orange-500 xs:text-XL/Bold'>
                      {dateConvertor(_maxMonth as string)}
                      {maxCount > 0 && (
                        <span className='text-XL/Medium text-grey-800 xs:text-L/Medium'>{` + ${maxCount}`}</span>
                      )}
                    </p>
                  </div>
                  <div className='flex w-full min-w-[180px] flex-col py-3 pl-5 xs:min-w-[160px]'>
                    <p>가장 적게 팔렸어요</p>
                    <p className='pt-2 text-2XL/Bold text-grey-900 xs:text-XL/Bold'>
                      {dateConvertor(_minMonth as string)}
                      {minCount > 0 && (
                        <span className='text-XL/Medium text-grey-800 xs:text-L/Medium'>{` + ${minCount}`}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </header>
            <main className='col-span-10 h-[320px] w-full'>
              <div className='h-full w-full'>
                <MarketSizeTrendChart trendData={{ interest, date }} />
              </div>
            </main>
          </div>
        )}

        <div className='border-grey-30 flex w-full border-t-[2px] border-b-[1px] xs:flex-col'>
          <div className='w-1/2 xs:w-full xs:border-b-[1px]'>
            <div className='h-10 w-full bg-grey-100 pl-5 text-left xs:border-b-[1px]'>
              <h1 className='pt-2.5 text-S/Medium text-grey-900 xs:text-S/Regular'>
                최근 30일 매출
              </h1>
            </div>
            <div className='my-7 flex xs:text-center'>
              <div className='ml-5 w-1/2 xs:ml-0'>
                <div className='flex items-center'>
                  <p className='text-S/Medium text-grey-800 xs:hidden'>합계</p>
                  <UseTooltip content={TotalSales({ itemCount })} />
                </div>
                <div className='mt-2 flex items-center xs:justify-center'>
                  <span className='mr-1 text-2XL/Bold text-grey-900 xs:text-L/Bold'>
                    {totalAmount}
                  </span>
                  <span className='text-L/Medium text-grey-800'>원</span>
                </div>
                <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>합계</p>
              </div>

              <div className='w-1/2 border-l-[1px] border-dashed pl-5 xs:pl-0'>
                <div className='flex items-center'>
                  <p className='text-S/Medium text-grey-800 xs:hidden'>평균</p>
                  <UseTooltip content={TotalSalesAvg({ itemCount })} />
                </div>
                <div className='mt-2 flex items-center xs:justify-center'>
                  <span className='mr-1 text-2XL/Regular text-grey-900 xs:text-L/Regular'>
                    {avgAmount}
                  </span>
                  <span className='text-L/Medium text-grey-800'>원</span>
                </div>
                <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>매출</p>
              </div>
            </div>
          </div>

          <div className='w-1/2 border-l-[1px] xs:mt-[30px] xs:w-full xs:border-l-0 xs:border-t-[2px]'>
            <div className='h-10 w-full bg-grey-100 text-left  xs:border-b-[1px]'>
              <h1 className='pt-2.5 pl-5 text-S/Medium text-grey-900 xs:text-S/Regular'>
                최근 30일 판매량
              </h1>
            </div>
            <div className='my-7 flex xs:text-center'>
              <div className='ml-5 w-1/2 xs:ml-0'>
                <div className='flex items-center'>
                  <p className='text-S/Medium text-grey-800 xs:hidden'>합계</p>
                  <UseTooltip content={TotalAmount({ text, itemCount })} />
                </div>
                <div className='mt-2 flex items-center xs:justify-center'>
                  <span className='mr-1 text-2XL/Regular text-grey-900 xs:text-L/Regular'>
                    {totalCount}
                  </span>
                  <span className='text-L/Medium text-grey-800'>개</span>
                </div>
                <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>합계</p>
              </div>
              <div className='w-1/2 border-l-[1px] border-dashed pl-5 xs:pl-0'>
                <div className='flex items-center'>
                  <p className='text-S/Medium text-grey-800 xs:hidden'>평균</p>
                  <UseTooltip content={TotalAmountAvg({ text, itemCount })} />
                </div>
                <div className='mt-2 flex items-center xs:justify-center'>
                  <span className='mr-1 text-2XL/Regular text-grey-900 xs:text-L/Regular'>
                    {avgCount}
                  </span>
                  <span className='text-L/Medium text-grey-800'>개</span>
                </div>
                <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>평균</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
