import { Dispatch, useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import { convertExchangeRate, roundNumber } from '@/report/container';
import { TReportAction } from '@/report/reducer';
import { formatNumber } from '@/utils/formatNumber';
import { isFalsy } from '@/utils/isFalsy';

interface IMBrandInformation {
  brandAnalysis: {
    focus: number;
    data: TBrandAnalysis | null;
  };
  forceBrandIndex: number;
  _dispatch: Dispatch<TReportAction>;
  currencyUnit: number;
  basePrice: number;
  amplitudeData: TAmplitudeDetailData;
}

export const MBrandInformation = (props: IMBrandInformation) => {
  const { brandAnalysis, forceBrandIndex, basePrice, currencyUnit } = props;

  const { data: brandAnalysisData } = brandAnalysis;

  const {
    totalSalesAmount: totalAmount,
    avgSalesAmount: avgAmount,
    avgPrice: avg,
    rank,
    productCount,
    totalSalesCount,
    avgSalesCount,
    name,
  } = brandAnalysisData!.brands[forceBrandIndex];

  const [totalSalesAmount, avgSalesAmount, avgPrice] = [totalAmount, avgAmount, avg].map(
    (price) =>
      formatNumber(roundNumber(convertExchangeRate(currencyUnit, price, basePrice))),
  );

  const rankLabelStyleClass = useMemo(() => {
    let style = 'fill-transparent text-black';

    if (rank === 1) {
      style = 'fill-orange-500 text-white';
    }
    if (rank === 2) {
      style = 'fill-[#B1B1B1] text-white';
    }
    if (rank === 3) {
      style = 'fill-grey-800 text-white';
    }
    return style;
  }, [rank]);

  const rowCommonCss =
    'mx-2 flex h-[66px] items-center text-center text-S/Regular text-grey-800 border-b-[1px] border-grey-300';
  const cellCommonCss = 'flex flex-1 flex-col items-center justify-center h-[66px]';
  return (
    <div className='border-t-[1px] border-grey-300'>
      <div className='border-b-[1px] bg-grey-100'>
        <div className='py-2.5 pl-5 '>
          <span className='text-S/Medium text-grey-900'>
            {isFalsy(name) ? 'No brand' : name}
          </span>
        </div>
      </div>
      <div className='flex flex-col border-grey-300'>
        <div className='flex flex-col divide-x-[1px] divide-dotted'>
          <div className='my-3 flex flex-col gap-4'>
            <div id='firstRow' className={rowCommonCss}>
              <div className='flex flex-1 items-center divide-x-[1px] divide-dotted pb-2'>
                <div className={cellCommonCss}>
                  <ReactSVG
                    src='/assets/icons/filled/RateLabel.svg'
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', `${rankLabelStyleClass} h-[45px]`);
                    }}
                  />
                  <div
                    className={`absolute mb-6 w-full text-center text-M/Bold leading-[40px] ${rankLabelStyleClass}`}
                  >
                    {rank}위
                  </div>
                  <div className='pt-1'>
                    <p>순위</p>
                  </div>
                </div>
                <div className={cellCommonCss}>
                  <p className='text-L/Regular'>
                    {formatNumber(productCount)}
                    <span className='pl-0.5 text-XS/Medium text-grey-700'>개</span>
                  </p>

                  <div className='pt-1'>
                    <p>상품 수</p>
                  </div>
                </div>
              </div>
            </div>

            <div id='secondRow' className={rowCommonCss}>
              <div className='flex flex-1 items-center divide-x-[1px] divide-dotted pb-2'>
                <div className={cellCommonCss}>
                  <p className='text-L/Bold text-orange-400'>
                    {totalSalesAmount}
                    <span className='pl-0.5 text-XS/Medium text-grey-700'>건</span>
                  </p>
                  <div className='pt-1'>
                    <p>매출 합계</p>
                  </div>
                </div>

                <div className={cellCommonCss}>
                  <p className='text-L/Regular'>
                    {formatNumber(totalSalesCount)}
                    <span className='pl-0.5 text-XS/Medium text-grey-700'>개</span>
                  </p>

                  <div className='pt-1'>
                    <p>판매량 합계</p>
                  </div>
                </div>
              </div>
            </div>
            <div id='thirdRow' className={rowCommonCss}>
              <div className='flex flex-1 items-center divide-x-[1px] divide-dotted pb-2'>
                <div className={cellCommonCss}>
                  <p className='text-L/Regular'>
                    {avgSalesAmount}
                    <span className='pl-0.5 text-XS/Medium text-grey-700'>원</span>
                  </p>
                  <div className='pt-1'>
                    <p>평균 매출</p>
                  </div>
                </div>

                <div className={cellCommonCss}>
                  <p className='text-L/Regular'>
                    {formatNumber(avgSalesCount)}
                    <span className='pl-0.5 text-XS/Medium text-grey-700'>개</span>
                  </p>
                  <div className='pt-1'>
                    <p>평균 판매량</p>
                  </div>
                </div>
              </div>
            </div>
            <div id='fourthRow' className={rowCommonCss}>
              <div className='flex flex-1 items-center divide-x-[1px] divide-dotted pb-2'>
                <div className={cellCommonCss}>
                  <p className='text-L/Regular'>
                    {avgPrice}
                    <span className='pl-0.5 text-XS/Medium text-grey-700'>원</span>
                  </p>
                  <div className='pt-1'>
                    <p>평균 판매가</p>
                  </div>
                </div>

                <div className={cellCommonCss}>
                  <p className='text-L/Regular'></p>
                  <div className='pt-1'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
