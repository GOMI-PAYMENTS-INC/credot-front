import { Dispatch, useRef } from 'react';
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
import type { TReportAction } from '@/report/reducer';
import { DetailReportSectionHeader } from '@/report/elements';
import UseTooltip from '@/components/UseTooltip';
import { PriceTooltips } from '@/report/price/Tooltip';

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
  const [SalesPriceTooltip, SalesTableTooltip] = PriceTooltips();
  const { gradeItems, priceAnalysisInfo, items } = salePriceInfo!;
  const { basePrice } = priceAnalysisInfo;

  const { min, max, levelBound, avg, removedOutlinerItmes } = changeSalePriceData(
    items,
    basePrice,
  );
  const [minPrice, _, avgPrice] = [min, max, avg].map((price) =>
    formatNumber(roundNumber(convertExchangeRate(currencyUnit, price, basePrice))),
  );

  const [highLength, mediumLength, lowLength] = gradeItems.map((item) => item.length);

  return (
    <section className='col-span-full'>
      <DetailReportSectionHeader id={TITLE.SALE_PRICE} />
      <div className='pt-4 xs:hidden'>
        <div className='flex  border-[1px] border-grey-300 py-3 px-3'>
          <p className='text-S/Regular text-grey-800'>
            <span className='text-S/Bold text-grey-800'>이상값(outliner)제외 안내 :</span>
            판매가 분포와 평균값 해석에 악영향을 끼치는 이상값들을 통계학적으로 계산하여
            제외 후 나타낸 자료입니다.
          </p>
        </div>
      </div>
      <div className='pt-4 xs:pt-6'>
        <div className='grid grid-cols-10 border-t-[1px] border-grey-300 xs:flex xs:flex-col'>
          <div className='col-span-2 flex flex-col xs:border-b-[1px]'>
            <div className='relative flex items-center border-b-[1px] border-t-[2px] bg-grey-100 xs:border-b-[1px]'>
              <div className='flex items-center py-2.5 pl-5'>
                <p className='text-S/Medium text-grey-900'>판매가 정보</p>
                <UseTooltip content={SalesPriceTooltip} />
              </div>
            </div>
            <div className='flex-grow-1 flex h-full w-full flex-col justify-center xs:flex-row xs:justify-evenly xs:divide-x-[1px] xs:divide-dotted xs:py-2 xs:text-center'>
              <div className='flex h-[186px] flex-col justify-center xs:my-4 xs:h-[52px]'>
                <div className='flex flex-col pl-5 xs:pl-0'>
                  <p className='text-S/Medium text-grey-800 xs:hidden'>최저가</p>
                  <div className='flex items-center pt-[11px] xs:pt-0'>
                    <p className='text-2XL/Bold text-orange-500 xs:text-L/Bold'>
                      {minPrice}
                    </p>
                    <span className='pl-1 text-L/Medium text-grey-800'>원</span>
                  </div>
                  <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>
                    최저가
                  </p>
                </div>
              </div>

              <div className='mx-5 flex flex-col border-t-[1px] xs:mx-0 xs:border-t-0 xs:pl-[50px]'>
                <div className='flex h-[186px] flex-col justify-center xs:my-4 xs:h-[52px]'>
                  <p className='text-S/Medium text-grey-800 xs:hidden'>평균 판매가</p>
                  <div className='flex items-center pt-[11px] xs:pt-0'>
                    <p className='text-2XL/Bold text-grey-900 xs:text-L/Bold'>
                      {avgPrice}
                    </p>
                    <span className='pl-1 text-L/Medium text-grey-800'>원</span>
                  </div>
                  <p className='mt-1 hidden text-S/Regular text-grey-800 xs:block'>
                    평균 판매가
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-8 col-start-3 flex h-full flex-col border-l-[1px] border-t-[2px] border-grey-300 xs:mt-[30px] xs:border-l-0'>
            <div className='flex border-b-[1px] bg-grey-100'>
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
        <div className='xs:hidden'>
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
            <UseTooltip content={SalesTableTooltip} />
          </div>
          <SalePriceTable
            scrollerRef={scrollerRef}
            salePriceItemList={list}
            currencyUnit={currencyUnit}
            basePrice={basePrice}
            amplitudeData={amplitudeData}
          />
        </div>
      </div>
    </section>
  );
};
