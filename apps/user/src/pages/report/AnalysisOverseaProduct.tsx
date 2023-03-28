import { Dispatch, Fragment, RefObject, useMemo } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

import { TITLE } from '@/types/enum.code';
import { convertTitle } from '@/utils/convertEnum';

import { AnalysisOverseaProductTable } from '@/pages/report/AnalysisOverseaProductTable';
import { OVERSEA_PRODUCT_RATIO } from '@/constants/report.constant';
import { isFalsy } from '@/utils/isFalsy';
import { TReportAction } from '@/containers/report/report.reducer';
import { COUNTRY_CODE } from '@/containers/report/country.code';
interface IAnalysisOverseaProduct {
  _dispatch: Dispatch<TReportAction>;
  scollerRef: RefObject<HTMLTableSectionElement>;
  overseaProduct: TOverseaProductData | null;
}

export const AnalysisOverseaProduct = (props: IAnalysisOverseaProduct) => {
  const { overseaProduct } = props;
  const [aFewProduct, fewProducts, manyProducts] = OVERSEA_PRODUCT_RATIO;
  const {
    id,
    text,
    itemOverseaCount,
    totalItemCount,
    overseaLocationCount,
    overseaItems,
  } = overseaProduct!;

  const amplitudeData: TAmplitudeDetailData = {
    report_id: id.toString(),
    keyword: text,
  };

  const locationOfPointer = useMemo(() => {
    if (itemOverseaCount < 4) {
      return 'afew';
    }
    if (itemOverseaCount < 8) {
      return 'few';
    }
    return 'many';
  }, [itemOverseaCount]);

  const overseaProductRatioCommonStyle =
    'flex w-20 flex-col items-center border-b-[4px] mb-1';

  return (
    <section className='col-span-full'>
      <h1 id={TITLE.OVERSEA_PRODUCT} className='detailReport-h1-header'>
        {convertTitle(TITLE.OVERSEA_PRODUCT)}
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
                      <p className='text-2XL/Bold text-grey-900'>{itemOverseaCount}</p>
                      <p className='pl-1 text-L/Medium'>{`/${totalItemCount} 개`}</p>
                    </div>
                  </div>
                </section>

                <section className='flex items-center justify-center pt-5 pb-[43px] text-S/Medium text-grey-600'>
                  <div className='flex flex-col items-center'>
                    <div className={`${overseaProductRatioCommonStyle}  border-grey-600`}>
                      <p className={`text-grey-600`}>{aFewProduct.text}</p>
                      <p className='pb-2 pt-0.5'>{aFewProduct.scope}</p>
                    </div>

                    {locationOfPointer === aFewProduct.key && (
                      <ReactSVG
                        className='mb-[-8px]'
                        src='/assets/icons/filled/Pointer.svg'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', `fill-grey-600`);
                        }}
                      />
                    )}
                  </div>

                  <div className='flex flex-col items-center'>
                    <div
                      className={`${overseaProductRatioCommonStyle}  mx-[2px] border-green-600`}
                    >
                      <p className={`text-green-600`}>{fewProducts.text}</p>
                      <p className='pb-2 pt-0.5'>{fewProducts.scope}</p>
                    </div>

                    {locationOfPointer === fewProducts.key && (
                      <ReactSVG
                        className='mb-[-8px]'
                        src='/assets/icons/filled/Pointer.svg'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', `fill-green-600`);
                        }}
                      />
                    )}
                  </div>

                  <div className='flex flex-col items-center'>
                    <div className={`${overseaProductRatioCommonStyle}  border-blue-600`}>
                      <p className={`text-blue-600`}>{manyProducts.text}</p>
                      <p className='pb-2 pt-0.5'>{manyProducts.scope}</p>
                    </div>

                    {locationOfPointer === manyProducts.key && (
                      <ReactSVG
                        className='mb-[-8px]'
                        src='/assets/icons/filled/Pointer.svg'
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', `fill-blue-600`);
                        }}
                      />
                    )}
                  </div>

                  {/* {OVERSEA_PRODUCT_RATIO.map((ratio) => (
                    <div className='flex flex-col items-center' key={ratio.key}>
                      <div
                        className={`${overseaProductRatioCommonStyle}  border-${
                          ratio.color
                        } ${ratio.key === 'few' ? 'mx-[2px]' : ''}`}
                      >
                        <p className={`text-${ratio.color}`}>{ratio.text}</p>
                        <p className='pb-2 pt-0.5'>{ratio.scope}</p>
                      </div>

                      {locationOfPointer === ratio.key && (
                        <ReactSVG
                          className='mb-[-8px]'
                          src='/assets/icons/filled/Pointer.svg'
                          beforeInjection={(svg) => {
                            svg.setAttribute('class', `fill-${ratio.color}`);
                          }}
                        />
                      )}
                    </div>
                  ))} */}
                </section>
              </div>
            </div>
          </div>
          <div className='col-span-7 col-start-4 flex h-full flex-col border-l-[1px] border-grey-300'>
            <div className='my-[12px] mx-5 flex h-full items-center justify-center overflow-x-auto'>
              <div className='h-full  w-full max-w-[710px] overflow-y-hidden'>
                {isFalsy(overseaLocationCount) ? (
                  <div className='flex h-full flex-col items-center justify-center'>
                    <ReactSVG src='/assets/icons/outlined/File.svg' />
                    <div className='pt-4 text-center text-grey-800'>
                      <p className='text-L/Medium'>해외배송 상품이 존재하지 않아요.</p>
                      <p className='pt-0.5 text-M/Medium text-grey-700'>
                        검색량이 적은 키워드인 경우 확인이 어려울 수 있어요.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-wrap text-S/Regular text-grey-900'>
                    {overseaLocationCount.map((country, idx) => {
                      const countryCode = COUNTRY_CODE[
                        country.itemShopLocation as keyof typeof COUNTRY_CODE
                      ] ?? { name: '베트남', flag: 'None' };

                      return (
                        <div
                          className={`float-left mx-1 mb-3 rounded-[4px] bg-grey-100 py-1`}
                          key={country.itemShopLocation}
                        >
                          <div className='flex w-[120px] items-center'>
                            <ReactSVG
                              className='pl-[5px]'
                              src={`/assets/icons/country/${countryCode.flag}.svg`}
                            />
                            <div className='flex pl-[7px]'>
                              <p className='pl-1'>{countryCode.name ?? '베트남'}</p>
                              <p className='pl-1'>{`${country.count}개`}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnalysisOverseaProductTable
        overseaItems={overseaItems}
        basePrice={5.52}
        amplitudeData={amplitudeData}
      />
    </section>
  );
};
