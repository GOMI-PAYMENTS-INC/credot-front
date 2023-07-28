import { useMemo, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { BrandAnalysisProductTable } from '@/preview/elements/brand/BrandAnalysisTable';

import { formatNumber, convertExchangeRate, roundNumber } from '@/preview/container';
import { BRAND_DATA } from '@/preview/elements/brand/constant';
import { DetailReportSectionHeader } from '@/preview/elements';
import { REPORT_CONTENT } from '@/preview/constants/reportData';
import { MBrandInformation } from '@/preview/elements/brand/MBrandInformation';

export const BrandAnalysis = () => {
  const { basePrice, currencyUnit } = BRAND_DATA;
  const [focusItem, setFocusItem] = useState<number>(0);
  const scrollerRef = useRef<HTMLTableSectionElement>(null);

  const {
    totalSalesAmount: totalAmount,
    avgSalesAmount: avgAmount,
    avgPrice: avg,

    productCount,
    totalSalesCount,
    avgSalesCount,
    products,
  } = BRAND_DATA.brands[focusItem];

  const [totalSalesAmount, avgSalesAmount, avgPrice] = [totalAmount, avgAmount, avg].map(
    (price) =>
      formatNumber(roundNumber(convertExchangeRate(currencyUnit, price, basePrice))),
  );

  const rankLabelStyleClass = useMemo(() => {
    let style = 'fill-transparent text-black';

    if (focusItem === 0) {
      style = 'fill-orange-500 text-white';
    }
    if (focusItem === 1) {
      style = 'fill-[#B1B1B1] text-white';
    }
    if (focusItem === 2) {
      style = 'fill-grey-800 text-white';
    }

    return style;
  }, [focusItem]);

  return (
    <section className='col-span-full'>
      <DetailReportSectionHeader id={REPORT_CONTENT.BRAND} />
      <div className='mt-4 bg-grey-100 px-5 py-3'>
        <ul className='flex flex-wrap gap-x-[14px] gap-y-3'>
          {BRAND_DATA?.brands.map((value, index) => {
            return (
              <li key={index}>
                <button
                  className={`${
                    focusItem === index
                      ? 'bg-orange-500 text-L/Bold text-white'
                      : 'border border-[#dddddd] bg-white text-L/Medium text-[#848484]'
                  } rounded-sm px-[19px] py-[6px] shadow-[0px_4px_6px_rgba(0,0,0,0.06)]`}
                  onClick={() => {
                    setFocusItem(index);
                    scrollerRef.current?.scroll(0, 0);
                  }}
                >
                  <span className=''>{value.name || 'No brand'}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/*브랜드 정보*/}
      <div className='pt-4 xs:pt-6'>
        <div className='border-t-[1px] border-b-[1px] border-grey-300 xs:hidden'>
          <div className='bg-grey-100'>
            <div className='py-2.5 pl-5 '>
              <span className='text-S/Medium text-grey-900'>브랜드 정보</span>
            </div>
          </div>

          <div className='flex  divide-x-[1px] divide-dotted'>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-S/Regular text-grey-800'>순위</span>
                </div>
                <div className='mt-2 flex items-center justify-center'>
                  <div className='relative h-[46px] w-[38px]'>
                    <ReactSVG
                      src='/assets/icons/RateLabel.svg'
                      className='absolute top-0 left-0'
                      beforeInjection={(svg) => {
                        svg.setAttribute('class', `${rankLabelStyleClass}`);
                      }}
                    />

                    <div
                      className={`absolute w-full text-center text-M/Regular leading-[40px] ${rankLabelStyleClass}`}
                    >
                      {focusItem + 1}위
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-S/Regular text-grey-800'>상품 수</span>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>
                    {formatNumber(productCount)}개
                  </p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-S/Regular text-grey-800'>매출 합계</span>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-orange-400'>{totalSalesAmount}원</p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-S/Regular text-grey-800'>판매량 합계</span>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>
                    {formatNumber(totalSalesCount)}개
                  </p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-S/Regular text-grey-800'>평균 매출</span>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>{avgSalesAmount}원</p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-S/Regular text-grey-800'>평균 판매량</span>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>
                    {formatNumber(avgSalesCount)}원
                  </p>
                </div>
              </div>
            </div>
            <div className='my-3 flex-1'>
              <div className='py-[5px] text-center'>
                <div className='ml-[10px] flex items-center justify-center'>
                  <span className='text-S/Regular text-grey-800'>평균 판매가</span>
                </div>
                <div className='mt-2 py-[15px]'>
                  <p className='text-M/Bold text-grey-900'>{avgPrice}원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden xs:block'>
          <MBrandInformation focusItem={focusItem} />
        </div>
      </div>

      <BrandAnalysisProductTable
        brandAnalysisProduct={products}
        basePrice={basePrice}
        currencyUnit={BRAND_DATA.currencyUnit}
        scrollerRef={scrollerRef}
      />
    </section>
  );
};
