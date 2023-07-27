import { useState, useRef } from 'react';

import {
  convertExchangeRate,
  roundNumber,
  formatNumber,
  convertGrade,
  changeSalePriceData,
  _setOpenContent,
} from '@/preview/container';
import { SalePriceChart } from '@/preview/elements/price/SalePriceChart';
import { SalePriceTable } from '@/preview/elements/price/SalePriceTable';
import { PRICE_DATA, GRADE_ITEMS } from '@/preview/elements/price/constant';
import { DetailReportSectionHeader } from '@/preview/elements';
import { REPORT_CONTENT } from '@/preview/constants/reportData';

export const SalePrice = () => {
  // const { salePriceInfo, currencyUnit, list } = PRICE_DATA;
  const scrollerRef = useRef<HTMLTableSectionElement>(null);
  const [fouceItem, setFocusItem] = useState<number>(0);

  const { gradeItems, priceAnalysisInfo, items, currencyUnit } = PRICE_DATA!;
  const { basePrice } = priceAnalysisInfo;

  const { min, max, levelBound, avg, removedOutlinerItmes } = changeSalePriceData(items);
  const [minPrice, maxPrice, avgPrice] = [min, max, avg].map((price) =>
    formatNumber(roundNumber(convertExchangeRate(currencyUnit, price, basePrice))),
  );

  const [highLength, mediumLength, lowLength] = gradeItems.map((item) => item.length);

  return (
    <section>
      <DetailReportSectionHeader id={REPORT_CONTENT.PRICE} />
      <div>
        <div className='flex  border-[1px] border-grey-300 py-3 px-3 xs:hidden'>
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
              <div className='py-2.5 pl-5'>
                <p className='text-S/Medium text-grey-900'>판매가 정보</p>
              </div>
            </div>
            <div className='flex-grow-1 flex h-full w-full flex-col justify-center xs:flex-row xs:justify-evenly xs:divide-x-[1px] xs:divide-dotted xs:py-2 xs:text-center'>
              <div className='flex h-[186px] flex-col justify-center xs:my-4 xs:h-[52px]'>
                <div className='flex flex-col pl-5 xs:pl-0'>
                  <p className='text-S/Medium text-grey-800'>최저가</p>
                  <div className='flex items-center pt-[11px] xs:pt-0'>
                    <p className='text-2XL/Bold text-orange-500'>{minPrice}</p>
                    <span className='pl-1 text-L/Medium text-grey-800'>원</span>
                  </div>
                </div>
              </div>

              <div className='mx-5 flex flex-col border-t-[1px] xs:mx-0 xs:border-t-0 xs:pl-[30px]'>
                <div className='flex h-[186px] flex-col justify-center xs:my-4 xs:h-[52px]'>
                  <p className='text-S/Medium text-grey-800'>평균 판매가</p>
                  <div className='flex items-center pt-[11px] xs:pt-1'>
                    <p className='text-2XL/Bold text-grey-900'>{avgPrice}</p>
                    <span className='pl-1 text-L/Medium text-grey-800'>원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-8 col-start-3 flex h-full flex-col border-l-[1px] border-grey-300  xs:mt-[30px] xs:border-l-0'>
            <div className='flex bg-grey-100'>
              <div className='py-2.5 pl-5'>
                <p className='text-S/Medium text-grey-900'>판매가 분포 차트</p>
              </div>
            </div>
            <div className='flex h-full  items-center justify-center'>
              <div className='w-full max-w-[710px] py-5'>
                <SalePriceChart
                  priceChartProps={PRICE_DATA}
                  currencyUnit={currencyUnit}
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
        <div className='mt-[30px] flex items-center xs:hidden'>
          <div className=' flex w-fit rounded-[8px] bg-grey-200 text-S/Medium'>
            <div className=' flex space-x-2 px-1 py-1'>
              {Object.values(GRADE_ITEMS).map((item, index) => {
                const countItem =
                  item === GRADE_ITEMS.HIGH
                    ? highLength
                    : item === GRADE_ITEMS.MEDIUM
                    ? mediumLength
                    : lowLength;

                const highlight =
                  index === fouceItem
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
                    key={`${item}_${index}`}
                    onClick={() => {
                      setFocusItem(index);
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
        </div>
        <SalePriceTable
          scrollerRef={scrollerRef}
          salePriceItemList={gradeItems[fouceItem]}
          currencyUnit={currencyUnit}
          basePrice={basePrice}
        />
      </div>
    </section>
  );
};
