import { useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import { TITLE } from '@/types/enum.code';

import { AnalysisOverseaProductTable } from '@/report/oversea/AnalysisOverseaProductTable';
import { OVERSEA_PRODUCT_RATIO } from '@/report/constants/score';
import { isFalsy } from '@/utils/isFalsy';

import { COUNTRY_CODE } from '@/report/constants/country';
import { replaceOverLength } from '@/utils/replaceOverLength';
import DetailReportSectionHeader from '@/report/elements/DetailReportSectionHeader';

interface IAnalysisOverseaProduct {
  overseaProduct: TOverseaProductData | null;
  currencyUnit: number;
  basePrice: number;
  amplitudeData: TAmplitudeDetailData;
}

export const AnalysisOverseaProduct = (props: IAnalysisOverseaProduct) => {
  const { overseaProduct, basePrice, amplitudeData, currencyUnit } = props;
  const [aFewProduct, fewProducts, manyProducts] = OVERSEA_PRODUCT_RATIO;

  const {
    id,
    text,
    itemOverseaCount,
    totalItemCount,
    overseaCountryCount,
    overseaItems,
  } = overseaProduct!;

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
      <DetailReportSectionHeader id={TITLE.OVERSEA_PRODUCT} />
      <div className='pt-4'>
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
                </section>
              </div>
            </div>
          </div>
          <div className='col-span-7 col-start-4 flex h-full flex-col border-l-[1px] border-grey-300'>
            <div className='my-[12px] mx-5 flex h-full items-center justify-center overflow-x-auto'>
              <div className='h-full  w-full max-w-[710px] overflow-y-hidden'>
                {isFalsy(overseaCountryCount) ? (
                  <div className='flex h-full flex-col items-center justify-center'>
                    <ReactSVG src='/assets/icons/outlined/File.svg' />
                    <div className='pt-4 text-center text-grey-800'>
                      <p className='text-L/Medium'>
                        수집된 상품 데이터에서는
                        <br /> 해외배송 상품이 존재하지 않아요.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-wrap gap-x-1 gap-y-3 text-S/Regular text-grey-900'>
                    {overseaCountryCount.map((country) => {
                      const countryCode = COUNTRY_CODE[
                        country.itemShopCountry as keyof typeof COUNTRY_CODE
                      ] ?? { name: '미분류국가', flag: 'None' };

                      return (
                        <div
                          className={`rounded-[4px] bg-grey-100 px-1 py-1`}
                          key={country.itemShopCountry}
                        >
                          <div className='flex items-center'>
                            <ReactSVG
                              className='pl-[5px]'
                              src={`/assets/icons/country/${countryCode.flag}.svg`}
                            />
                            <div className='flex pl-[6px]'>
                              <p>{replaceOverLength(countryCode.name, 5)}</p>
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
      {isFalsy(overseaItems) === false && (
        <AnalysisOverseaProductTable
          currencyUnit={currencyUnit}
          overseaItems={overseaItems}
          basePrice={basePrice}
          amplitudeData={amplitudeData}
        />
      )}
    </section>
  );
};
