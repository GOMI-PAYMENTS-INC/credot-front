import { useState, Fragment } from 'react';
import { ReactSVG } from 'react-svg';
import {
  convertEvaluateStatus,
  convertRecommendationScoreToText,
} from '@/preview/elements/keyword/Convertor';

import { openBrowser } from '@/utils/openBrowser';
import { CountryType } from '@/preview/elements/keyword/constant';
import { RECOMMENDATION_DATA } from '@/preview/elements/keyword/constant';
import {
  _setOpenContent,
  convertShopeeSiteUrl,
  convertExchangeRate,
  formatNumber,
  roundNumber,
} from '@/preview/container';

export const RecommendationChart = () => {
  const { relations, country, currencyUnit, basePrice } = RECOMMENDATION_DATA;

  const [openToggle, setOpenToggle] = useState<number[]>([0]);

  return (
    <section className='pt-10 xs:hidden'>
      <table className='relative z-[2] col-span-full h-full w-full  table-auto bg-white'>
        <thead className='h-[54px] border-t-[1px] border-b-[1px] border-grey-300 bg-grey-100 text-center'>
          <tr>
            <th className='w-[302px] text-left' colSpan={1}>
              <p className=' pl-3 text-XS/Medium'>추천 키워드</p>
            </th>
            <th className='w-[82px]' colSpan={1}>
              <p className='px-4  text-XS/Medium'>검색량</p>
            </th>
            <th className='w-[82px]' colSpan={1}>
              <p className='px-4  text-XS/Medium'>노출 경쟁</p>
            </th>
            <th className='w-[82px]' colSpan={1}>
              <p className='px-[13px] text-XS/Medium'>CPC 경쟁</p>
            </th>
            <th className='w-[72px]' colSpan={1}>
              <p className='px-1 text-XS/Medium'>노출 경쟁률</p>
            </th>
            <th className='w-[104px]' colSpan={1}>
              <div className='px-3 text-right text-XS/Medium'>
                <p>검색량</p>
                <hr className='ml-[62px] border-grey-300' />
                <p>경쟁상품 수</p>
              </div>
            </th>
            <th className='w-[72px]' colSpan={1}>
              <p className='px-[10px] text-XS/Medium'>CPC 비율</p>
            </th>
            <th className='w-[104px]' colSpan={1}>
              <div className='px-3 text-right text-XS/Medium'>
                <p>CPC</p>
                <hr className='ml-[62px] border-grey-300' />
                <p>평균 판매가</p>
              </div>
            </th>
            <th className='w-[40px]' colSpan={1}></th>
            <th className='w-[40px]' colSpan={1}></th>
          </tr>
        </thead>

        <tbody>
          {relations.map((data, index) => {
            const [search, competiton, cpc] = data.evaluateStatus;
            const status = openToggle.includes(index);
            const backgroundColor = status ? 'border-orange-200' : 'border-grey-300';
            const { top, bottom } = convertEvaluateStatus(data.evaluateStatus);

            return (
              <Fragment key={`product_key_${data.id}`}>
                <tr className='mt-3 flex' />
                <tr
                  className={`border-[1px] ${backgroundColor} cursor-pointer hover:bg-grey-200`}
                  onClick={() =>
                    _setOpenContent({
                      _dipatch: setOpenToggle,
                      _state: openToggle,
                      index,
                    })
                  }
                >
                  <td>
                    <div className='ml-3 flex'>
                      <p>{data.text}</p>
                    </div>
                  </td>
                  <td>
                    <div className='flex justify-center'>
                      {convertRecommendationScoreToText(search)}
                    </div>
                  </td>
                  <td>
                    <div className='flex justify-center'>
                      {convertRecommendationScoreToText(competiton)}
                    </div>
                  </td>
                  <td>
                    <div className='flex justify-center'>
                      {convertRecommendationScoreToText(cpc)}
                    </div>
                  </td>
                  <td className='bg-grey-50'>
                    <div className='flex justify-center'>
                      <p className='text-S/Bold'>{`1:${roundNumber(
                        data.competitionRate,
                      )}`}</p>
                    </div>
                  </td>
                  <td>
                    <div className='flex flex-col flex-wrap-reverse  py-3 pr-3'>
                      <div className='bordered flex h-5 w-[58px] justify-end '>
                        <p className='pl-0.5 text-XS/Medium'>
                          {formatNumber(data.searchCount)}
                        </p>
                        <p className='pl-0.5 text-XS/Medium text-grey-700'>건</p>
                      </div>
                      <hr className='my-[3px] ml-[62px] border-grey-300' />
                      <div className='bordered flex h-5 w-[58px] justify-end '>
                        <p className='pl-0.5 text-XS/Medium'>
                          {formatNumber(data.competitionProductCount)}
                        </p>
                        <p className='pl-0.5 text-XS/Medium text-grey-700'>개</p>
                      </div>
                    </div>
                  </td>
                  <td className='bg-grey-50'>
                    <div className='flex justify-center text-center'>
                      <div className='h-5 w-[43px]'>
                        <p className='text-S/Bold'>{formatNumber(data.cpcRate)}%</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='flex flex-col flex-wrap-reverse py-3 pr-3'>
                      <div className='bordered flex h-5 w-[58px] justify-end '>
                        <p className='pl-0.5 text-XS/Medium'>
                          {formatNumber(
                            roundNumber(
                              convertExchangeRate(currencyUnit, data.cpcPrice, basePrice),
                            ),
                          )}
                        </p>
                        <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                      </div>
                      <hr className='my-[3px] ml-[62px] border-grey-300' />
                      <div className='bordered flex h-5 w-[58px] justify-end '>
                        <p className='pl-0.5 text-XS/Medium'>
                          {formatNumber(
                            roundNumber(
                              convertExchangeRate(currencyUnit, data.avgPrice, basePrice),
                            ),
                          )}
                        </p>
                        <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='flex justify-center'>
                      <button
                        className='flex h-5 w-5 cursor-pointer items-center'
                        onClick={() => {
                          openBrowser(
                            `${convertShopeeSiteUrl(
                              country as CountryType,
                            )}/search?keyword=${data.text}`,
                          );
                        }}
                      >
                        <ReactSVG
                          className=''
                          src='/assets/icons/Linkout.svg'
                          beforeInjection={(svg) =>
                            svg.setAttribute('class', 'fill-grey-900')
                          }
                        />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className='flex justify-center'>
                      <div className='flex h-5 w-5'>
                        <ReactSVG
                          className={status ? 'z-0 rotate-90' : 'z-0 -rotate-90'}
                          src='/assets/icons/LeftArrow.svg'
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                {status && (
                  <tr>
                    <td
                      colSpan={10}
                      className='border-[1px] border-orange-200 bg-orange-100'
                    >
                      <div className='bg-orange-100'>
                        <div className='my-2.5 mx-2.5 border-[1px] border-grey-300 bg-white'>
                          <div className='py-3 px-3'>
                            <h1 className='text-M/Bold text-grey-900'>요약</h1>
                            <div className='pt-1'>
                              <div className='break-all text-S/Regular text-grey-800'>
                                {top}
                              </div>
                              <div className='break-all text-S/Regular text-grey-800'>
                                {bottom}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
