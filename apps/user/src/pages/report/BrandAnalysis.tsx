import React from 'react';

import DetailReportSectionHeader from '@/pages/report/DetailReportSectionHeader';
import { TITLE } from '@/types/enum.code';

const BrandAnalysis = () => {
  return (
    <section className='col-span-full'>
      <DetailReportSectionHeader id={TITLE.BRAND_ANALYSIS} />
      <div className='pt-4'>
        <div></div>
        <div className='grid grid-cols-10 border-t-[1px] border-b-[1px] border-grey-300'>
          <div className='relative col-span-10 flex w-full bg-grey-100'>
            <div className='py-2.5 pl-5 '>
              <p className='text-S/Medium text-grey-900'>해외 배송 상품 비율</p>
            </div>
          </div>

          <div className='col-span-3 flex flex-col'>
            <div className='flex-grow-1 flex h-full flex-col items-center justify-center'>
              <div className='flex w-full flex-col'>
                <section className='mx-10 flex border-b-[1px] border-dashed pb-[34px] pt-[45px] text-S/Medium text-grey-800'>
                  <div className='flex w-full items-center justify-between'>
                    <p>해외 배송 상품</p>
                    <div className='flex items-center'>
                      <p className='text-2XL/Bold text-grey-900'></p>
                      <p className='pl-1 text-L/Medium'>{`/ 개`}</p>
                    </div>
                  </div>
                </section>

                <section className='flex items-center justify-center pt-5 pb-[43px] text-S/Medium text-grey-600'>
                  <div className='flex flex-col items-center'>
                    <div className={`  border-grey-600`}>
                      <p className={`text-grey-600`}></p>
                      <p className='pb-2 pt-0.5'></p>
                    </div>
                  </div>

                  <div className='flex flex-col items-center'>
                    <div className={`mx-[2px] border-green-600`}>
                      <p className={`text-green-600`}></p>
                      <p className='pb-2 pt-0.5'></p>
                    </div>
                  </div>

                  <div className='flex flex-col items-center'>
                    <div className={`border-blue-600`}>
                      <p className={`text-blue-600`}></p>
                      <p className='pb-2 pt-0.5'></p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className='col-span-7 col-start-4 flex h-full flex-col border-l-[1px] border-grey-300'>
            <div className='my-[12px] mx-5 flex h-full items-center justify-center overflow-x-auto'>
              <div className='h-full  w-full max-w-[710px] overflow-y-hidden'></div>
            </div>
          </div>
        </div>
      </div>
      {/*{isFalsy(overseaItems) === false && (
        <AnalysisOverseaProductTable
          currencyUnit={currencyUnit}
          overseaItems={overseaItems}
          basePrice={basePrice}
          amplitudeData={amplitudeData}
        />
      )}*/}
    </section>
  );
};
export default BrandAnalysis;
