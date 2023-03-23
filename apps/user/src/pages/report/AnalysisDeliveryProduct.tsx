import { Dispatch, Fragment, RefObject } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { TITLE } from '@/types/enum.code';
import { convertTitle } from '@/utils/convertEnum';

import { AnalysisDeliveryProductTable } from '@/pages/report/AnalysisDeliveryProductTable';
import { DELIVERY_PRODUCT_RATIO } from '@/containers/report/report.constant';

import { TReportAction } from '@/containers/report/report.reducer';

interface IAnalysisDeliveryProduct {
  _dispatch: Dispatch<TReportAction>;
  list: TSalePriceItems[];
  scollerRef: RefObject<HTMLTableSectionElement>;
}

export const AnalysisDeliveryProduct = (props: IAnalysisDeliveryProduct) => {
  const { _dispatch, list, scollerRef } = props;
  const deliveryProductRatioCommonStyle =
    'flex w-20 flex-col items-center border-b-[4px] mb-1';
  // /<p className='pt-[2px] pb-4'>
  return (
    <section className='col-span-full'>
      <h1 id={TITLE.DELIVERY_PRODUCT} className='detailReport-h1-header'>
        {convertTitle(TITLE.DELIVERY_PRODUCT)}
      </h1>

      <div className='pt-4'>
        <div className='grid grid-cols-10 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='relative col-span-10 flex w-full bg-grey-100'>
            <div className='py-2.5 pl-5 '>
              <p className='text-S/Medium text-grey-900'>해외 상품 비율</p>
            </div>
          </div>

          <div className='col-span-3 flex flex-col'>
            <div className='flex-grow-1 flex h-full flex-col items-center justify-center'>
              <div className='flex w-full flex-col'>
                <section className='mx-10 flex border-b-[1px] border-dashed pb-[34px] pt-[45px] text-S/Medium text-grey-800'>
                  <div className='flex w-full items-center justify-between'>
                    <p>해외 배송 상품</p>
                    <div className='flex items-center'>
                      <p className='text-2XL/Bold text-grey-900'>0</p>
                      <p className='pl-1 text-L/Medium'>{`/50 개`}</p>
                    </div>
                  </div>
                </section>

                <section className='flex items-center justify-center pt-5 pb-[43px] text-S/Medium text-grey-600'>
                  {DELIVERY_PRODUCT_RATIO.map((ratio) => (
                    <div className='flex flex-col items-center' key={ratio.key}>
                      <div
                        className={`${deliveryProductRatioCommonStyle}  border-${
                          ratio.color
                        } ${ratio.key === 'medium' && 'mx-[2px]'}`}
                      >
                        <p className={`text-${ratio.color}`}>{ratio.text}</p>
                        <p className='pb-2 pt-0.5'>{ratio.scope}</p>
                      </div>
                      <ReactSVG
                        src='/assets/icons/filled/Pointer.svg'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', `fill-${ratio.color}`);
                        }}
                      />
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
          <div className='col-span-7 col-start-4 flex h-full flex-col border-l-[1px] border-grey-300'>
            <div className='my-[12px] mx-5 flex h-full items-center justify-center overflow-x-auto'>
              <div className='h-full  w-full max-w-[710px] overflow-y-hidden'>
                <div className='flex h-full flex-col items-center justify-center'>
                  <ReactSVG src='/assets/icons/outlined/File.svg' />
                  <div className='pt-4 text-center text-grey-800'>
                    <p className='text-L/Medium'>해외배송 상품이 존재하지 않아요.</p>
                    <p className='pt-0.5 text-M/Medium text-grey-700'>
                      검색량이 적은 키워드인 경우 확인이 어려울 수 있어요.
                    </p>
                  </div>
                </div>
                <div className='flex flex-wrap text-S/Regular text-grey-900'>
                  {/* {[1, 2, 3, 4, 5, 6, 7].map((el, idx) => (
                    <div
                      className={`float-left mx-1 mb-3 rounded-[4px] bg-grey-100 py-1`}
                      key={el}
                    >
                      <div className='flex w-[120px] items-center'>
                        <ReactSVG
                          className='pl-[5px]'
                          src='/assets/icons/country/Korea.svg'
                        />
                        <div className='flex pl-[7px]'>
                          <p className='pl-1'>{`한국`}</p>
                          <p className='pl-1'>{`5개`}</p>
                        </div>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnalysisDeliveryProductTable
        scollerRef={scollerRef}
        salePriceItemList={list}
        basePrice={5.52}
      />
    </section>
  );
};
