import { Fragment } from 'react';
import { ReactSVG } from 'react-svg';

import { openBrowser } from '@/containers/report';
import { formatNumber } from '@/utils/formatNumber';
import { convertExchangeRate, roundNumber } from '@/containers/report';

import { replaceOverLength } from '@/utils/replaceOverLength';
import { isFalsy } from '@/utils/isFalsy';
import { COUNTRY_CODE } from '@/containers/report/country.code';
import { _reportEngagementMovedToPDP } from '@/amplitude/amplitude.service';
import { convertTitle } from '@/utils/convertEnum';
import { TITLE } from '@/types/enum.code';
interface ISalePriceTable {
  basePrice: number;
  overseaItems: TOverSeaItems[];
  amplitudeData: TAmplitudeDetailData;
}

export const AnalysisOverseaProductTable = (props: ISalePriceTable) => {
  const { amplitudeData, overseaItems, basePrice } = props;

  //FIXME: 모든 계산로직은 데이터를 서버에서 받아온 후, reducer에 가공한 데이터를 넣자
  return (
    <table className='overflow-y col-span-full mt-[27px] block h-[436px] w-full overflow-hidden rounded-xl border-[1px] bg-white'>
      <thead className='h-[40px] border-b-[1px] border-grey-300 bg-grey-100 text-center'>
        <tr>
          <th className='w-[368px] text-left' colSpan={1}>
            <p className=' pl-3 text-XS/Medium'>상품</p>
          </th>
          <th className='w-[132px] text-left' colSpan={1}>
            <p className=' pl-3 text-XS/Medium'>국가</p>
          </th>
          <th className='w-[128px] text-right' colSpan={1}>
            <p className='px-4  text-XS/Medium'>판매가</p>
          </th>
          <th className='w-[128px] text-right' colSpan={1}>
            <p className='px-4  text-XS/Medium'>월 추정 매출</p>
          </th>
          <th className='w-[120px] text-right' colSpan={1}>
            <p className='px-[13px] text-XS/Medium'>월 판매량</p>
          </th>
          <th className='w-[100px] text-center' colSpan={1}>
            <p className='px-1 text-XS/Medium'>노출 순위</p>
          </th>
          <th className='w-[80px] text-right' colSpan={1}></th>
        </tr>
      </thead>
      <tbody
        id='scrollbar'
        className={`${
          isFalsy(overseaItems) ? '' : 'block'
        } h-[393px] w-full overflow-y-auto`}
      >
        {isFalsy(overseaItems) ? (
          <tr>
            <td colSpan={7}>
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
            {overseaItems.map((item, idx) => {
              const countryCode = COUNTRY_CODE[
                item.itemShopLocation as keyof typeof COUNTRY_CODE
              ] ?? { name: '베트남', flag: 'None' };
              return (
                <tr
                  className={
                    idx === overseaItems.length - 1
                      ? 'w-full border-grey-300 text-right'
                      : 'w-full border-b-[1px] border-grey-300 text-right'
                  }
                  key={`${item.id}_${idx}`}
                >
                  <td className='w-[368px]'>
                    <div className='flex items-center'>
                      <img className='my-2 ml-4 h-14 w-14' src={item.itemImage} />

                      <div className='basis-full py-4'>
                        <p className=' w-[230px] break-all pl-[11px] text-left text-S/Regular text-grey-900'>
                          {replaceOverLength(item.itemName, 55)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='w-[132px]'>
                    <div className='flex items-center text-S/Medium text-grey-900'>
                      <ReactSVG src={`/assets/icons/country/${countryCode.flag}.svg`} />
                      <p className='pl-2'>{countryCode.name}</p>
                    </div>
                  </td>
                  <td className='w-[128px]'>
                    {item.itemPriceMax === item.itemPriceMin ? (
                      <Fragment>
                        <div className='flex items-center justify-end px-4'>
                          <p className='texgt-grey-800 text-S/Medium'>
                            {formatNumber(
                              roundNumber(
                                convertExchangeRate(item.itemPriceAvg, basePrice),
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
                                    convertExchangeRate(item.itemPriceMin, basePrice),
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
                                    convertExchangeRate(item.itemPriceMax, basePrice),
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
                        onClick={() =>
                          _reportEngagementMovedToPDP(
                            amplitudeData.report_id,
                            amplitudeData.keyword,
                            convertTitle(TITLE.OVERSEA_PRODUCT),
                            item.itemUrl,
                          )
                        }
                      >
                        <ReactSVG className='' src='/assets/icons/outlined/Linkout.svg' />
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
