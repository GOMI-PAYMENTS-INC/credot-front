import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
import { formatNumber } from '@/utils/formatNumber';
import { convertExachangeRate } from '@/containers/report/report.container';
import { TITLE } from '@/types/enum.code';
interface IMartketSize {
  marketSize: TMarketSize;
}

export const MartketSize = (props: IMartketSize) => {
  const { totalSalesAmount, avgSalesAmount, totalSalesCount, avgSalesCount, basePrice } =
    props.marketSize;

  const [totalAmount, avgAmount, totalCount, avgCount] = [
    totalSalesAmount,
    avgSalesAmount,
    totalSalesCount,
    avgSalesCount,
  ]
    .map((number, idx) => {
      if (idx > 1) return number;
      return convertExachangeRate(number, basePrice);
    })
    .map((number) => formatNumber(number));

  return (
    <section>
      <h1 id={TITLE.MARTKET_SIZE} className='detailReport-h1-header'>
        시장 규모
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
              <span className='text-XS/Bold'>{` 30개 `}</span>
              상품들이 판매된 매출과 판매량 정보에요.
            </p>
          </div>
        </Tooltip>
      </h1>

      <div className='pt-6'>
        <div className='border-grey-30 flex w-full border-t-[1px] border-b-[1px]  bg-grey-100'>
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
          >
            <div className='flex flex-col rounded-[3px] border-[1px] border-grey-200 bg-white px-4 py-4 pr-[61px] '>
              <p className='text-XS/Regular text-grey-900'>
                리포트 생성일 기준, 최근 30일간 상위
                <span className='text-XS/Bold'>{` 30개 `}</span>
                상품들이 판매된 매출과 판매량 정보에요.
              </p>
            </div>
          </Tooltip>
        </div>
        <div className='flex h-[320px] w-full'>
          <div className='flex flex-col text-S/Medium text-grey-800'>
            <div className='pl-5'>
              <p>가장 많이 팔려요</p>
              <p className='pt-2 text-2XL/Bold text-[#FF5100]'>4월</p>
            </div>
            <div className='pl-5'>
              <p>가장 많이 팔려요</p>
              <p className='pt-2 text-2XL/Bold text-grey-900'>12월</p>
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
