import { Fragment, useMemo } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { formatNumber } from '@/utils/formatNumber';
import { convertedGoogleTrendData, convertExchangeRate } from '@/report/container';
import { TITLE } from '@/types/enum.code';
import { MarketSizeTrendChart } from '@/report/market/MarketSizeTrendChart';
import { isFalsy } from '@/utils/isFalsy';
import { _amplitudeMovedToUserGuide } from '@/amplitude/amplitude.service';
import { convertCountry } from '@/utils/convertEnum';
import { convertTime } from '@/utils/parsingTimezone';
import { openBrowser } from '@/utils/openBrowser';
import { DetailReportSectionHeader } from '@/report/elements';

interface IMarketSize {
  marketSize: TMarketSize;
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
    createdAt,
    trend,
    itemCount,
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

  const { interest, date, minTurnoverMonth, maxTurnoverMonth } =
    convertedGoogleTrendData(trend);

  const created = convertTime(createdAt, 'YYYY');
  const lastYearToCreated = Number(created) - 1;

  const headerTooltipContent = useMemo(
    () => (
      <p className='text-XS/Regular text-grey-900'>
        리포트 생성일 기준, 최근 30일간 상위
        <span className='text-XS/Bold'>{` ${itemCount}개 `}</span>
        상품들이 판매된 매출과 판매량 정보에요.
      </p>
    ),
    [itemCount],
  );

  const googleTrendTooltipContent = useMemo(() => {
    return (
      <>
        <p className='text-XS/Regular text-grey-900'>
          현지에서 해당 키워드에 대한 작년도 검색 트랜드를 나타내요.
          <br />
          검색 트랜드 정보는 매출을 예측하거나 재고관리를 위해 사용할 수 있어요.
        </p>
        <div className='flex w-full justify-end'>
          <button
            className='cursor-pointer pt-[14px] text-XS/Bold text-[#FF5100]'
            onClick={() => {
              openBrowser(
                'https://gomicorp.notion.site/4c1f1b468dbf47798c860d73df8ca605#5d9a582f9946471aa96bd093ca7b16c7',
              );
              _amplitudeMovedToUserGuide('키워드 리포트_시장 분석');
            }}
          >
            자세히 알아보기
          </button>
        </div>
      </>
    );
  }, []);

  const headerTooltipInfo = useMemo(() => {
    return {
      iconPath: '/assets/icons/outlined/QuestionCircle.svg',
      tooltipRender: headerTooltipContent,
    };
  }, []);

  return (
    <section>
      <DetailReportSectionHeader
        id={TITLE.MARKET_SIZE}
        isTooltip={true}
        tooltipInfo={headerTooltipInfo}
      />

      <div className='pt-6'>
        <div className='grid grid-cols-10 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='border-grey-30 relative col-span-10 flex w-full items-center border-t-[1px] border-b-[1px] bg-grey-100'>
            <h1 className='flex items-center py-2.5 pl-5 text-S/Medium text-grey-900'>
              검색트렌드
              <span className='pl-[4px] text-XS/Medium text-grey-700'>
                {lastYearToCreated}_google {convertCountry(country)}
              </span>
            </h1>
            <div className='tooltip-container'>
              <a data-tooltip-id='anchor-market-google-trend'>
                <ReactSVG
                  src='/assets/icons/outlined/QuestionCircle.svg'
                  className='inline-block self-center pl-[7px]'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'fill-grey-500 w-[14px] h-[14px]');
                  }}
                />
              </a>
              <Tooltip
                id='anchor-market-google-trend'
                place='right'
                variant='light'
                clickable={true}
                render={() => googleTrendTooltipContent}
              ></Tooltip>
            </div>
          </div>

          <Fragment>
            <div className='col-span-2 flex min-h-[320px] flex-col justify-center pl-5 text-S/Medium text-grey-800  xs:hidden'>
              <div className='mt-5 flex min-h-[140px] flex-col justify-center border-r-[1px] border-dashed pb-3'>
                <p>가장 많이 팔려요</p>
                {maxTurnoverMonth.map((month, key) => (
                  <p
                    key={`max_turn_over_${key}`}
                    className='pt-2 text-2XL/Bold text-[#FF5100]'
                  >
                    {`${month}월`}
                  </p>
                ))}
              </div>

              <div className='mb-5 flex min-h-[140px] flex-col justify-center border-t-[1px] border-r-[1px] border-dashed pt-5 '>
                <p>가장 적게 팔려요</p>
                <ul className='flex flex-wrap'>
                  {minTurnoverMonth.map((month, key) => (
                    <li
                      key={`min_turn_over_${key}`}
                      className='basis-1/2 pt-2 text-2XL/Bold text-grey-900'
                    >
                      {`${month}월`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='col-span-8 flex h-[320px] w-full flex-col items-center text-S/Medium text-grey-800 xs:col-span-12'>
              <div className='h-full w-full max-w-[710px] py-5'>
                {isFalsy(interest) ? (
                  <div className='flex h-full flex-col'>
                    <div className='flex h-full flex-col items-center justify-center'>
                      <ReactSVG
                        src='/assets/icons/outlined/ExclamationCircle.svg'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', `w-[35px] h-[35px] fill-grey-400`);
                        }}
                      />
                      <div className='flex flex-col items-center pt-[11px] text-center'>
                        <p className='text-L/Medium text-grey-800'>
                          검색 트랜드 정보가 존재하지 않아요.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <MarketSizeTrendChart trendData={{ interest, date }} />
                )}
              </div>
            </div>
          </Fragment>
        </div>
        <div className='col-span-12 hidden min-h-[50px] justify-around px-5 py-[14px] pl-5 text-center text-L/Bold xs:flex'>
          <div className=' flex w-1/2 flex-col justify-center'>
            <div className='flex w-[144px] flex-wrap justify-center gap-x-1 self-center'>
              {maxTurnoverMonth.map((month, key) => (
                <p key={`max_turn_over_${key}`} className='text-L/Bold text-[#FF5100]'>
                  {`${month}월`}
                </p>
              ))}
            </div>
            <p className='text-S/Regular text-grey-800'>가장 많이 팔려요</p>
          </div>

          <div className='flex w-1/2 flex-col justify-center'>
            <div className='flex w-[144px] flex-wrap justify-center gap-x-1 self-center'>
              {minTurnoverMonth.map((month, key) => (
                <p key={`min_turn_over_${key}`} className='text-L/Bold text-grey-900'>
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
              <h1 className='pt-2.5 text-S/Medium text-grey-900 xs:text-S/Regular'>
                매출
              </h1>
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
      </div>
    </section>
  );
};
