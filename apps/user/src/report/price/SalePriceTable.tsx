import { Fragment, RefObject } from 'react';
import { ReactSVG } from 'react-svg';

import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate, roundNumber } from '@/report/container';
import { openBrowser } from '@/utils/openBrowser';
import { replaceOverLength } from '@/utils/replaceOverLength';
import { _amplitudeMovedToPDP } from '@/amplitude/amplitude.service';
import { convertTitle } from '@/utils/convertEnum';
import { TITLE } from '@/types/enum.code';

interface ISalePriceTable {
  salePriceItemList: TSalePriceItems[];
  currencyUnit: number;
  basePrice: number;
  scrollerRef: RefObject<HTMLTableSectionElement>;
  amplitudeData: TAmplitudeDetailData;
}

export const SalePriceTable = (props: ISalePriceTable) => {
  const { amplitudeData, salePriceItemList, currencyUnit, basePrice, scrollerRef } =
    props;
  //FIXME: 모든 계산로직은 데이터를 서버에서 받아온 후, reducer에 가공한 데이터를 넣자
  return (
    <table className='overflow-y col-span-full mt-[27px] block max-h-[436px] w-full overflow-hidden rounded-xl border-[1px] bg-white'>
      <thead className='h-[40px] border-b-[1px] border-grey-300 bg-grey-100 text-center'>
        <tr>
          <th className='w-[422px] text-left' colSpan={1}>
            <p className=' pl-3 text-XS/Medium'>상품</p>
          </th>
          <th className='w-[128px] text-right' colSpan={1}>
            <p className='px-4  text-XS/Medium'>판매가</p>
          </th>
          <th className='w-[128px] text-right' colSpan={1}>
            <p className='px-4  text-XS/Medium'>최근 30일 매출</p>
          </th>
          <th className='w-[120px] text-right' colSpan={1}>
            <p className='px-[13px] text-XS/Medium'>최근 30일 판매량</p>
          </th>
          <th className='w-[100px] text-center' colSpan={1}>
            <p className='px-1 text-XS/Medium'>노출 순위</p>
          </th>
          <th className='w-[80px] text-right' colSpan={1}></th>
        </tr>
      </thead>
      <tbody
        id='scrollbar'
        className='block max-h-[393px] w-full overflow-y-auto '
        ref={scrollerRef}
      >
        {salePriceItemList.map((item, idx) => {
          return (
            <tr
              className={
                idx === salePriceItemList.length - 1
                  ? 'w-full border-grey-300 text-right'
                  : 'w-full border-b-[1px] border-grey-300 text-right'
              }
              key={`${item.id}_${idx}`}
            >
              <td className='w-[422px]'>
                <div className='flex items-center'>
                  <img className='my-2 ml-4 h-14 w-14' src={item.itemImage} />

                  <div className='basis-full py-4 pr-3'>
                    <p className='break-all pl-[11px] text-left text-S/Regular text-grey-900'>
                      {replaceOverLength(item.itemName, 70)}
                    </p>
                  </div>
                </div>
              </td>
              <td className='w-[128px]'>
                {item.itemPriceMax === item.itemPriceMin ? (
                  <Fragment>
                    <div className='flex items-center justify-end px-4'>
                      <p className='texgt-grey-800 text-S/Medium'>
                        {formatNumber(
                          roundNumber(
                            convertExchangeRate(
                              currencyUnit,
                              item.itemPriceAvg,
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
                <div className='flex items-center justify-end px-4 text-S/Medium'>
                  <p>
                    {formatNumber(
                      roundNumber(
                        convertExchangeRate(
                          currencyUnit,
                          item.itemPriceAvg * item.item30daysSold,
                          basePrice,
                        ),
                      ),
                    )}
                  </p>
                  <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                </div>
              </td>

              <td className='w-[120px]'>
                <div className='flex items-center justify-end px-[13px] text-S/Medium'>
                  <p>{item.item30daysSold}</p>
                  <p className='pl-0.5 text-XS/Medium text-grey-700'>개</p>
                </div>
              </td>
              <td className='w-[100px]'>
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
                        convertTitle(TITLE.SALE_PRICE),
                      );
                    }}
                  >
                    <ReactSVG
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
      </tbody>
    </table>
  );
};
