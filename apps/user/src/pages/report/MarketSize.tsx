import { Fragment } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate, convertedData } from '@/containers/report/report.container';
import { TITLE } from '@/types/enum.code';

import { MarketSizeTrendChart } from './MarketSizeTrendChart';
import { isFalsy } from '@/utils/isFalsy';

interface IMartketSize {
  marketSize: TMarketSize;
}

export const MartketSize = (props: IMartketSize) => {
  const {
    totalSalesAmount,
    avgSalesAmount,
    totalSalesCount,
    avgSalesCount,
    basePrice,
    trend,
  } = props.marketSize;

  const [totalAmount, avgAmount, totalCount, avgCount] = [
    totalSalesAmount,
    avgSalesAmount,
    totalSalesCount,
    avgSalesCount,
  ]
    .map((number, idx) => {
      if (idx > 1) return number;
      return convertExchangeRate(number, basePrice);
    })
    .map((number) => formatNumber(number));

  const { interest, date, minTurnoverMonth, maxTurnoverMonth } = convertedData(trend);

  return (
    <section>
      <h1 id={TITLE.MARTKET_SIZE} className='detailReport-h1-header'>
        시장 분석
        <ReactSVG
          id='anchor-market-size'
          src='/assets/icons/outlined/QuestionCircle.svg'
          className='inline-block pl-[7px]'
        />
        <Tooltip
          anchorId='anchor-market-size'
          style={{ background: 'none' }}
          place='right'
        >
          <div className='flex flex-col rounded-[3px] border-[1px] border-grey-200 bg-white px-4 py-4'>
            <p className='text-XS/Regular text-grey-900'>
              리포트 생성일 기준, 최근 30일간 상위
              <span className='text-XS/Bold'>{` 50개 `}</span>
              상품들이 판매된 매출과 판매량 정보에요.
            </p>
          </div>
        </Tooltip>
      </h1>

      <div className='pt-6'>
        <div className='grid grid-cols-10 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='border-grey-30 relative col-span-10 flex w-full border-t-[1px] border-b-[1px]  bg-grey-100'>
            <h1 className='flex items-center py-2.5 pl-5 text-S/Medium text-grey-900'>
              검색트렌드
              <span className='pl-[4px] text-XS/Medium text-grey-700'>
                2022_google 베트남
              </span>
            </h1>
            <ReactSVG
              id='anchor-market-google-trend'
              src='/assets/icons/outlined/QuestionCircle.svg'
              className='inline-block self-center pl-[7px]'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'fill-grey-500 w-[14px] h-[14px]');
              }}
            />
            <Tooltip
              anchorId='anchor-market-google-trend'
              style={{ background: 'none' }}
              place='right'
              clickable={true}
              delayHide={1300}
            >
              <div className='col-span-2 flex flex-col rounded-[3px] border-[1px] border-grey-200 bg-white px-4 py-4  '>
                <p className='text-XS/Regular text-grey-900'>
                  현지에서 해당 키워드에 대한 작년도 검색 트랜드를 나타내요.
                  <br />
                  검색 트랜드 정보는 매출을 예측하거나 재고관리를 위해 사용할 수 있어요.
                </p>
                <div className='flex w-full justify-end'>
                  <a
                    href='https://gomicorp.notion.site/4c1f1b468dbf47798c860d73df8ca605#5d9a582f9946471aa96bd093ca7b16c7'
                    target='_blank'
                    className='cursor-pointer pt-[14px] text-XS/Bold text-[#FF5100]'
                  >
                    자세히 알아보기
                  </a>
                </div>
              </div>
            </Tooltip>
          </div>

          <Fragment>
            <div className='col-span-2 flex h-[320px] flex-col justify-center pl-5 text-S/Medium  text-grey-800'>
              <div className='mt-5 flex h-[140px] flex-col justify-center border-r-[1px] border-dashed pb-3'>
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

              <div className='mb-5 flex h-[140px] flex-col justify-center border-t-[1px] border-r-[1px] border-dashed pt-5 '>
                <p>가장 적게 팔려요</p>
                {minTurnoverMonth.map((month, key) => (
                  <p
                    key={`min_turn_over_${key}`}
                    className='pt-2 text-2XL/Bold text-grey-900'
                  >
                    {`${month}월`}
                  </p>
                ))}
              </div>
            </div>
            <div className='col-span-8 flex h-[320px] w-full flex-col items-center text-S/Medium text-grey-800'>
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
                        <p className='pt-[3px] text-M/Medium text-grey-700'>
                          검색량이 적은 키워드인 경우 트랜드 확인이 어려울 수 있어요.
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
                  <span className='mr-1 text-2XL/Regular text-grey-900'>
                    {totalCount}
                  </span>
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
      </div>
    </section>
  );
};
