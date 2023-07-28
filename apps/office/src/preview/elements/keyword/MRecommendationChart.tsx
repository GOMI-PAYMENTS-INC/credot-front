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
import { replaceOverLength } from '@/utils/replaceOverLength';

export const MRecommendationChart = () => {
  const [openToggle, setOpenToggle] = useState<number[]>([0]);
  const {
    relations,
    country,

    currencyUnit,
    basePrice,
  } = RECOMMENDATION_DATA;

  return (
    <section className='relative z-20 hidden pt-10 xs:block'>
      <div className='keywordInfo-span-subtitle border-t-[2px] border-b-[1px] border-grey-300'>
        <p>추천 키워드</p>
      </div>

      {relations.map((data, index) => {
        const [search, competiton, cpc] = data.evaluateStatus
          .split('')
          .map((status) => convertRecommendationScoreToText(status));
        const status = openToggle.includes(index);
        const backgroundColor = status
          ? 'xs:border-orange-200 xs:border-[1px] xs:bg-orange-100'
          : '';
        const rowCommonCss = `mx-2 flex h-[66px] items-center text-center text-S/Regular text-grey-800`;
        const cellCommonCss = 'flex flex-1 flex-col items-center justify-center h-[66px]';

        const paddingBottonCss = status ? 'pb-2' : '';
        return (
          <div
            key={data.id}
            className={`flex flex-col border-b-[1px] border-grey-300 ${paddingBottonCss} ${backgroundColor}`}
            onClick={() =>
              _setOpenContent({
                _dipatch: setOpenToggle,
                _state: openToggle,
                index,
              })
            }
          >
            <div className='flex min-h-[68px] items-center justify-between pl-5'>
              <p>{replaceOverLength(data.text, 26)}</p>
              <div className='mr-[10px] flex items-center justify-center gap-5'>
                <button
                  className='flex h-5 w-5 cursor-pointer items-center'
                  onClick={() => {
                    openBrowser(
                      `${convertShopeeSiteUrl(country as CountryType)}/search?keyword=${
                        data.text
                      }`,
                    );
                  }}
                >
                  <ReactSVG
                    className=''
                    src='/assets/icons/Linkout.svg'
                    beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-900')}
                  />
                </button>
                <div className='flex h-5 w-5'>
                  <ReactSVG
                    className={status ? 'z-0 rotate-90' : 'z-0 -rotate-90'}
                    src='/assets/icons/LeftArrow.svg'
                  />
                </div>
              </div>
            </div>
            {status && (
              <div className='flex flex-col gap-4'>
                <div id='firstRow' className={rowCommonCss}>
                  <div className='flex flex-1 items-center divide-x-[1px] divide-dotted'>
                    <div className={cellCommonCss}>
                      {search}
                      <div className='pt-1'>
                        <p>검색량</p>
                      </div>
                    </div>
                    <div className={cellCommonCss}>
                      {competiton}
                      <div className='pt-1'>
                        <p>노출 경쟁</p>
                      </div>
                    </div>
                    <div className={cellCommonCss}>
                      {cpc}
                      <div className='pt-1'>
                        <p>CPC 경쟁</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='secondRow' className={rowCommonCss}>
                  <div className='flex flex-1 items-center divide-x-[1px] divide-dotted'>
                    <div className={cellCommonCss}>
                      <p className='text-L/Medium'>{`1:${roundNumber(
                        data.competitionRate,
                      )}`}</p>
                      <div className='pt-1'>
                        <p>노출 경쟁률</p>
                      </div>
                    </div>
                    <div className={cellCommonCss}>
                      <p className='pl-0.5 text-L/Medium'>
                        {formatNumber(data.searchCount)}
                        <span className='pl-0.5 text-XS/Medium text-grey-700'>건</span>
                      </p>
                      <div className='pt-1'>
                        <p>검색량</p>
                      </div>
                    </div>
                    <div className={cellCommonCss}>
                      <p className='pl-0.5 text-L/Medium'>
                        {formatNumber(data.competitionProductCount)}
                        <span className='pl-0.5 text-XS/Medium text-grey-700'>개</span>
                      </p>
                      <div className='pt-1'>
                        <p>경쟁 상품수</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='thirdRow' className={rowCommonCss}>
                  <div className='flex flex-1 items-center divide-x-[1px] divide-dotted'>
                    <div className={cellCommonCss}>
                      <p className='text-L/Medium'>
                        {formatNumber(
                          roundNumber(
                            convertExchangeRate(currencyUnit, data.cpcPrice, basePrice),
                          ),
                        )}
                        <span className='pl-0.5 text-XS/Medium text-grey-700'>원</span>
                      </p>

                      <div className='pt-1'>
                        <p>CPC</p>
                      </div>
                    </div>
                    <div className={cellCommonCss}>
                      <p className='pl-0.5 text-L/Medium'>
                        {formatNumber(
                          roundNumber(
                            convertExchangeRate(currencyUnit, data.avgPrice, basePrice),
                          ),
                        )}
                        <span className='pl-0.5 text-XS/Medium text-grey-700'>원</span>
                      </p>

                      <div className='pt-1'>
                        <p>평균 판매가</p>
                      </div>
                    </div>
                    <div className={cellCommonCss}>
                      <p className='pl-0.5 text-L/Medium'></p>
                      <div className='pt-1'></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
