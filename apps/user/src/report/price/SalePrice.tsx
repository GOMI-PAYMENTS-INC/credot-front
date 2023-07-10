import { Dispatch, useMemo, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { GRADE_ITEMS, TITLE } from '@/types/enum.code';
import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate, roundNumber } from '@/report/container';

import { SalePriceChart } from '@/report/price/SalePriceChart';
import { SalePriceTable } from '@/report/price/SalePriceTable';

import {
  changeSalePriceData,
  convertGrade,
  selectSalePriceCompetitionType,
} from '@/report/container';
import { TReportAction } from '@/report/reducer';
import { DetailReportSectionHeader } from '@/report/elements';

interface ISalePrice {
  salePriceInfo: TSalePriceData;
  _dispatch: Dispatch<TReportAction>;
  list: TSalePriceItems[];
  focus: GRADE_TYPE;
  currencyUnit: number;
  amplitudeData: TAmplitudeDetailData;
}

export const SalePrice = (props: ISalePrice) => {
  const { _dispatch, salePriceInfo, list, focus, currencyUnit, amplitudeData } = props;
  const scrollerRef = useRef<HTMLTableSectionElement>(null);

  const { id, text, gradeItems, priceAnalysisInfo, items } = salePriceInfo!;
  const { basePrice } = priceAnalysisInfo;

  const { min, max, levelBound, avg, removedOutlinerItmes } = changeSalePriceData(
    items,
    basePrice,
  );
  const [minPrice, maxPrice, avgPrice] = [min, max, avg].map((price) =>
    formatNumber(roundNumber(convertExchangeRate(currencyUnit, price, basePrice))),
  );

  const [highLength, mediumLength, lowLength] = gradeItems.map((item) => item.length);

  const salesInfoTooltipContent = useMemo(
    () => (
      <div className='flex justify-between '>
        <div>
          <h1 className='text-XS/Medium'>최저가</h1>
          <p className='pt-0.5 text-XS/Regular text-grey-800'>
            가장 저렴한 상품의 판매가격이에요.
          </p>
        </div>
        <div className='px-3'>
          <h1 className='text-XS/Medium'>평균 판매가</h1>
          <p className='pt-0.5 text-XS/Regular text-grey-800'>
            상품들이 판매되는 가격의 평균값이에요.
          </p>
        </div>
      </div>
    ),
    [],
  );

  const salesChartTooltipContent = useMemo(
    () => (
      <div className='flex space-x-3'>
        <div className='flex flex-col'>
          <p className='pt-2 text-XS/Bold'>가격 높음 상품</p>
          <span>최저가순 상위 1~10위 상품들이에요.</span>
          <p className='pt-2 text-XS/Bold'>가격 보통 상품</p>
          <span>최저가순 상위 11~30위 상품들이에요.</span>
          <p className='pt-2 text-XS/Bold'>가격 낮음 상품</p>
          <span>최저가순 상위 31~50위 상품들이에요.</span>
        </div>
        <div className='flex flex-col'>
          <p className='pt-2 text-XS/Bold'>판매가</p>
          <span>키워드 검색결과 내 상품들이 판매되는 평균 판매가</span>
          <p className='pt-2 text-XS/Bold'>월 추정 매출</p>
          <span>
            상품 판매가를 월 판매량과 곱하여 추정한 월 매출이에요 (옵션
            <br /> 상품인 경우 옵션가의 중앙값을 적용하여 계산)
          </span>
          <p className='pt-2 text-XS/Bold'>월 판매량</p>
          <span>최근 30일간 상품이 판매된 건수에요.</span>
          <p className='pt-2 text-XS/Bold'>노출 순위</p>
          <span>키워드 검색 시 상품이 노출되고 있는 순위에요.</span>
        </div>
      </div>
    ),
    [],
  );

  return (
    <section className='col-span-full'>
      <DetailReportSectionHeader id={TITLE.SALE_PRICE} />
      <div className='pt-4'>
        <div className='flex  border-[1px] border-grey-300 py-3 px-3'>
          <p className='text-S/Regular text-grey-800'>
            <span className='text-S/Bold text-grey-800'>이상값(outliner)제외 안내 :</span>
            판매가 분포와 평균값 해석에 악영향을 끼치는 이상값들을 통계학적으로 계산하여
            제외 후 나타낸 자료입니다.
          </p>
        </div>
      </div>
      <div className='pt-4'>
        <div className='grid grid-cols-10 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='col-span-2 flex flex-col'>
            <div className='relative flex items-center bg-grey-100'>
              <div className='py-2.5 pl-5 '>
                <p className='text-S/Medium text-grey-900'>판매가 정보</p>
              </div>
              <div className='tooltip-container'>
                <a data-tooltip-id='anchor-market-salesInfo'>
                  <ReactSVG
                    src='/assets/icons/outlined/QuestionCircle.svg'
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                    }}
                    className='flex self-center pl-[5px]'
                  />
                </a>
                <Tooltip
                  id='anchor-market-salesInfo'
                  place='right'
                  variant='light'
                  render={() => salesInfoTooltipContent}
                ></Tooltip>
              </div>
            </div>
            <div className='flex-grow-1 flex h-full flex-col justify-center '>
              <div className='flex h-[186px] flex-col justify-center'>
                <div className='flex flex-col pl-5'>
                  <p className=' text-S/Medium text-grey-800'>최저가</p>
                  <div className='flex items-center pt-[11px]'>
                    <p className='text-2XL/Bold text-orange-500'>{minPrice}</p>
                    <span className='pl-1 text-L/Medium text-grey-800'>원</span>
                  </div>
                </div>
              </div>

              <div className='mx-5 flex flex-col border-t-[1px] '>
                <div className='flex h-[186px] flex-col justify-center'>
                  <p className='text-S/Medium text-grey-800'>평균 판매가</p>
                  <div className='flex items-center pt-[11px]'>
                    <p className='text-2XL/Bold text-grey-900'>{avgPrice}</p>
                    <span className='pl-1 text-L/Medium text-grey-800'>원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-8 col-start-3 flex h-full flex-col border-l-[1px] border-grey-300'>
            <div className='flex bg-grey-100'>
              <div className='py-2.5 pl-5'>
                <p className='text-S/Medium text-grey-900'>판매가 분포 차트</p>
              </div>
            </div>
            <div className='flex h-full  items-center justify-center'>
              <div className='w-full max-w-[710px] py-5'>
                <SalePriceChart
                  priceChartProps={props.salePriceInfo!}
                  currencyUnit={props.currencyUnit}
                  changedPrice={{
                    min: min,
                    max: max,
                    levelBound: levelBound,
                    removedOutlinerItmes: removedOutlinerItmes,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[30px] flex items-center'>
          <div className=' flex w-fit rounded-[8px] bg-grey-200 text-S/Medium'>
            <div className=' flex space-x-2 px-1 py-1'>
              {Object.values(GRADE_ITEMS).map((item, idx) => {
                const countItem =
                  item === GRADE_ITEMS.HIGH
                    ? highLength
                    : item === GRADE_ITEMS.MEDIUM
                    ? mediumLength
                    : lowLength;

                const highlight =
                  item === focus
                    ? {
                        divStyle: 'bg-white',
                        spanStyle: 'text-orange-500',
                        textStyle: 'text-S/Bold',
                      }
                    : {
                        divStyle: 'bg-grey-200',
                        spanStyle: 'text-grey-700',
                        textStyle: '',
                      };
                return (
                  <div
                    className={`cursor-pointer rounded ${highlight.divStyle}`}
                    key={`${item}_${idx}`}
                    onClick={() => {
                      selectSalePriceCompetitionType(item, _dispatch);
                      scrollerRef.current?.scroll(0, 0);
                    }}
                  >
                    <p className={`px-2 py-2 ${highlight.textStyle}`}>
                      {`가격 ${convertGrade(item)} 상품`}
                      <span className={highlight.spanStyle}>{` ${countItem}`}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='tooltip-container ml-[11px]'>
            <a data-tooltip-id='anchor-market-salesChart'>
              <ReactSVG
                src='/assets/icons/outlined/QuestionCircle.svg'
                className='flex self-center pl-[5px]'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'fill-grey-500 h-4 w-4 ');
                }}
              />
            </a>
            <Tooltip
              id='anchor-market-salesChart'
              place='right'
              variant='light'
              render={() => salesChartTooltipContent}
            ></Tooltip>
          </div>
        </div>
        <SalePriceTable
          scrollerRef={scrollerRef}
          salePriceItemList={list}
          currencyUnit={currencyUnit}
          basePrice={basePrice}
          amplitudeData={amplitudeData}
        />
      </div>
    </section>
  );
};
