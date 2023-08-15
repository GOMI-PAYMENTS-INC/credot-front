import { Fragment, RefObject } from 'react';
import { ReactSVG } from 'react-svg';

import { openBrowser } from '@/utils/openBrowser';
import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate, roundNumber } from '@/report/container';

import { replaceOverLength } from '@/utils/replaceOverLength';
import { isFalsy } from '@/utils/isFalsy';
import { TITLE } from '@/types/enum.code';
import { _amplitudeMovedToPDP } from '@/amplitude/amplitude.service';
import { convertTitle } from '@/utils/convertEnum';

interface IBrandAnalysisProductTable {
  currencyUnit: number;
  basePrice: number;
  brandAnalysisProduct: TBrandAnalysisProduct[];
  scrollerRef: RefObject<HTMLTableSectionElement>;
  amplitudeData: TAmplitudeDetailData;
}

export const BrandAnalysisProductTable = (props: IBrandAnalysisProductTable) => {
  const { amplitudeData, brandAnalysisProduct, currencyUnit, basePrice, scrollerRef } =
    props;

  //FIXME: 모든 계산로직은 데이터를 서버에서 받아온 후, reducer에 가공한 데이터를 넣자
  return (
    <table className='col-span-full mt-[27px] block max-h-[436px] w-full overflow-hidden rounded-xl border-[1px] bg-white xs:hidden'>
      <thead className='h-[40px] border-b-[1px] border-grey-300 bg-grey-100 text-center'>
        <tr>
          <th className='w-[500px] text-left' colSpan={2}>
            <p className='pl-3 text-XS/Medium'>브랜드 상품</p>
          </th>
          <th className='w-[128px] text-right' colSpan={1}>
            <p className='pr-3 text-XS/Medium'>판매가</p>
          </th>
          <th className='w-[128px] text-right' colSpan={1}>
            <p className='pr-3 text-XS/Medium'>최근 30일 매출</p>
          </th>
          <th className='w-[80px] text-right' colSpan={1}>
            <p className='pr-3 text-XS/Medium'>최근 30일 판매량</p>
          </th>
          <th className='w-[64px] text-center' colSpan={1}>
            <p className='pr-[9.5px] text-XS/Medium'>노출 순위</p>
          </th>
          <th className='w-[80px] text-right' colSpan={1}></th>
        </tr>
      </thead>
      <tbody
        id='scrollbar'
        className={`${
          isFalsy(brandAnalysisProduct) ? '' : 'block'
        } max-h-[393px] w-full overflow-y-auto`}
        ref={scrollerRef}
      >
        {isFalsy(brandAnalysisProduct) ? (
          <tr>
            <td colSpan={6}>
              <div className='flex flex-col items-center justify-center text-center'>
                <img src={`/assets/images/EmptyBox.png`} alt='검색 결과 없음 아이콘' />
                <div className='mt-4 text-L/Medium text-grey-800'>
                  <p>요청하신 키워드의 검색결과 내 상품이 존재하지 않아요.</p>
                </div>
              </div>
            </td>
          </tr>
        ) : (
          <Fragment>
            {brandAnalysisProduct.map((item, idx) => {
              return (
                <tr
                  className={
                    idx === brandAnalysisProduct.length - 1
                      ? 'w-full border-grey-300 text-right'
                      : 'w-full border-b-[1px] border-grey-300 text-right'
                  }
                  key={`${item.id}_${idx}`}
                >
                  <td className='w-[500px]'>
                    <div className='flex items-center'>
                      <img className='my-2 ml-4 h-14 w-14' src={item.itemImage} />

                      <div className='basis-full py-4 pr-3'>
                        <p className='break-all pl-[11px] text-left text-S/Regular text-grey-900'>
                          {replaceOverLength(item.itemName, 55)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className='w-[128px]'>
                    {item.itemPriceMax === item.itemPriceMin ? (
                      <Fragment>
                        <div className='flex items-center justify-end pr-3'>
                          <p className='texgt-grey-800 text-S/Medium'>
                            {formatNumber(
                              roundNumber(
                                convertExchangeRate(
                                  currencyUnit,
                                  item.itemPriceMax,
                                  basePrice,
                                ),
                              ),
                            )}
                          </p>
                          <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className='flex flex-col flex-wrap-reverse py-3 pr-3 text-XS/Medium'>
                          <div className='bordered flex h-5 w-[104px] justify-between'>
                            <p className='text-grey-700'>최저</p>
                            <div className='flex'>
                              <p className='pl-0.5'>
                                {formatNumber(
                                  roundNumber(
                                    convertExchangeRate(
                                      currencyUnit,
                                      item.itemPriceMin,
                                      basePrice,
                                    ),
                                  ),
                                )}
                              </p>
                              <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                            </div>
                          </div>
                          <hr className='my-[3px]  w-[104px] border-grey-300' />
                          <div className='bordered flex h-5 w-[104px] justify-between'>
                            <p className='text-grey-700'>최고</p>
                            <div className='flex'>
                              <p className='pl-0.5'>
                                {formatNumber(
                                  roundNumber(
                                    convertExchangeRate(
                                      currencyUnit,
                                      item.itemPriceMax,
                                      basePrice,
                                    ),
                                  ),
                                )}
                              </p>
                              <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </td>
                  <td className='w-[128px]'>
                    <div className='flex items-center justify-end pr-3 text-S/Medium'>
                      <p>
                        {formatNumber(
                          roundNumber(
                            convertExchangeRate(
                              currencyUnit,
                              ((item.itemPriceMax + item.itemPriceMin) / 2) *
                                item.item30daysSold,
                              basePrice,
                            ),
                          ),
                        )}
                      </p>
                      <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                    </div>
                  </td>

                  <td className='w-[80px]'>
                    <div className='flex items-center justify-end pr-3  text-S/Medium'>
                      <p>{item.item30daysSold}</p>
                      <p className='pl-0.5 text-XS/Medium text-grey-700'>개</p>
                    </div>
                  </td>
                  <td className='w-[64px]'>
                    <div className='flex items-center justify-center text-S/Medium'>
                      <p>{item.rank}</p>
                      <p className='pl-0.5 text-XS/Medium text-grey-700'>위</p>
                    </div>
                  </td>
                  <td className='w-[80px]'>
                    <div className='flex justify-center text-S/Medium'>
                      <button
                        className='flex h-5 w-5 cursor-pointer items-center'
                        onClick={() => {
                          openBrowser(item.itemUrl);
                          _amplitudeMovedToPDP(
                            amplitudeData.param,
                            amplitudeData.keyword,
                            convertTitle(TITLE.BRAND_ANALYSIS),
                          );
                        }}
                      >
                        <ReactSVG
                          className=''
                          src='/assets/icons/outlined/Linkout.svg'
                          beforeInjection={(svg) =>
                            svg.setAttribute('class', 'fill-grey-900')
                          }
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Fragment>
        )}
      </tbody>
    </table>
  );
};
