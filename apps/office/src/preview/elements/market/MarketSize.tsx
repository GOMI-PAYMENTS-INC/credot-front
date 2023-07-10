import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
import { MarketSizeTrendChart } from '@/preview/elements/market/MarketSizeTrendChart';
import { openBrowser } from '@/utils/openBrowser';
import { convertedGoogleTrendData } from '@/preview/container';
import { TRAND_DATA } from '@/preview/constants';

export const MarketSize = () => {
  const Data = {
    totalSalesAmount: '5,421',
    avgSalesAmount: '108.4',
    totalSalesCount: '128,797,643',
    avgSalesCount: '2,575,952',
  };

  const { interest, date } = convertedGoogleTrendData(TRAND_DATA);

  const created = 2023;
  const lastYearToCreated = created - 1;

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
            }}
          >
            자세히 알아보기
          </button>
        </div>
      </>
    );
  }, []);

  return (
    <div className=''>
      <div className='grid grid-cols-10'>
        <div className='border-grey-30 relative col-span-10 flex w-full items-center border-b-[1px]  bg-grey-100'>
          <h1 className='flex items-center py-2.5 pl-5 text-S/Medium text-grey-900'>
            검색트렌드
            <span className='pl-[4px] text-XS/Medium text-grey-700'>
              {lastYearToCreated}_google 베트남
            </span>
          </h1>
          <div className='tooltip-container'>
            <a data-tooltip-id='anchor-market-google-trend'>
              <ReactSVG
                src='/assets/icons/QuestionCircle.svg'
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

        <div className='col-span-2 flex min-h-[320px] flex-col justify-center pl-5 text-S/Medium  text-grey-800'>
          <div className='mt-5 flex min-h-[140px] flex-col justify-center border-r-[1px] border-dashed pb-3'>
            <p>가장 많이 팔려요</p>
            <p className='pt-2 text-2XL/Bold text-[#FF5100]'>07월</p>
          </div>
          <div className='mb-5 flex min-h-[140px] flex-col justify-center border-t-[1px] border-r-[1px] border-dashed pt-5 '>
            <p>가장 적게 팔려요</p>
            <ul className='flex flex-wrap'>
              <li className='basis-1/2 pt-2 text-2XL/Bold text-grey-900'>04월</li>
            </ul>
          </div>
        </div>
        <div className='col-span-8 flex h-[320px] w-full flex-col items-center text-S/Medium text-grey-800'>
          <div className='h-full w-full max-w-[710px] py-5'>
            <MarketSizeTrendChart trendData={{ interest, date }} />
          </div>
        </div>
      </div>

      <div className='border-grey-30 flex w-full border-t-[1px]'>
        <div className='w-1/2'>
          <div className='h-10 w-full bg-grey-100 pl-5 text-left '>
            <h1 className='pt-2.5 text-S/Medium text-grey-900'>매출</h1>
          </div>
          <div className='my-7 flex'>
            <div className='ml-5 w-1/2'>
              <p className='text-S/Medium text-grey-800'>매출 합계</p>
              <div className='mt-2 flex items-center '>
                <span className='mr-1 text-2XL/Bold text-grey-900'>
                  {Data.totalSalesAmount}
                </span>
                <span className='text-L/Medium text-grey-800'>원</span>
              </div>
            </div>
            <div className='w-1/2 border-l-[1px] border-dashed pl-5'>
              <p className='text-S/Medium text-grey-800'>평균 매출</p>
              <div className='mt-2 flex items-center '>
                <span className='mr-1 text-2XL/Regular text-grey-900'>
                  {Data.avgSalesAmount}
                </span>
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
                  {Data.totalSalesAmount}
                </span>
                <span className='text-L/Medium text-grey-800'>개</span>
              </div>
            </div>
            <div className='w-1/2 border-l-[1px] border-dashed pl-5'>
              <p className='text-S/Medium text-grey-800'>평균 판매량</p>
              <div className='mt-2 flex items-center '>
                <span className='mr-1 text-2XL/Regular text-grey-900'>
                  {Data.avgSalesCount}
                </span>
                <span className='text-L/Medium text-grey-800'>개</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
