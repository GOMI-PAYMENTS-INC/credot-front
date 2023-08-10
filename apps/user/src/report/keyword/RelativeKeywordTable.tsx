import { Dispatch, Fragment, useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import { BATCH_STATUS } from '@/types/enum.code';

import { isFalsy } from '@/utils/isFalsy';
import { isIncluded } from '@/utils/isIncluded';
import { isToggleOpen } from '@/report/container';
import { KeywordAnalysisCard } from '@/report/keyword/elements';

import { convertEvaluateStatus, convertScoreToText } from '@/report/constants/Score';
import { formatNumber } from '@/utils/formatNumber';

import { TReportAction } from '@/report/reducer';
import { _getRelationReport } from '@/report/container';
import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { convertShopeeSiteUrl } from '@/utils/convertEnum';
import { CountryType } from '@/generated/graphql';
import { openBrowser } from '@/utils/openBrowser';
import { getConversionRate } from '@/report/keyword/container';
import { convertToWon } from '@/report/keyword/container';
import { getElementLocation } from '@/utils/getElementLocation';

interface IRecommendationChart {
  relations: TRelationReport[] | null;
  country: CountryType | null;
  _dispatch: Dispatch<TReportAction> | null;
  toggleEvent: { id: number; isOpen: boolean }[];
  sorted: TSortBy;
  currencyUnit: number;
  basePrice: number;
  amplitudeData?: TAmplitudeDetailData;
}

export const RelativeKeywordTable = (props: IRecommendationChart) => {
  const {
    amplitudeData,
    relations,
    country,
    _dispatch,
    toggleEvent,
    currencyUnit,
    basePrice,
    sorted,
  } = props;

  const recomendationItems = useMemo(
    () =>
      isFalsy(relations)
        ? []
        : relations!.filter((data) =>
            isIncluded(data.batchStatus, BATCH_STATUS.DONE, BATCH_STATUS.REPLICATE),
          ),
    [],
  );
  if (isFalsy(relations) || isFalsy(recomendationItems)) return <Fragment />;

  return (
    <section className='pt-10'>
      <div className='flex flex-col border-t-[2px] border-grey-300'>
        <div className='keywordInfo-span-subtitle  border-b-[1px]'>
          <span>연관 키워드</span>
        </div>

        <ul className='z-20 my-[18px] space-y-[18px]'>
          {recomendationItems.map((item, index) => {
            const conversionRate = item.totalSalesCount / item.searchCount;
            const rateGrade = item.evaluateStatus + getConversionRate(conversionRate);
            const [search, competition, cpc, conversion] = rateGrade
              .split('')
              .map((grade) => convertScoreToText(grade));

            const status = isFalsy(toggleEvent.find((event) => event.id === item.id));
            const backgroundColor = status ? 'border-grey-300' : 'bg-grey-100';
            const {
              searchCount,
              totalSalesCount,
              competitionRate,
              competitionProductCount,
              cpcRate,
              cpcPrice,
              avgPrice,
              id,
            } = item;
            const [_cpcPrice, _avgPrice] = [cpcPrice, avgPrice].map((price) =>
              convertToWon(currencyUnit, price, basePrice),
            );
            const [_searchCount, _competitionProductCount, _cpcRate] = [
              searchCount,
              competitionProductCount,
              cpcRate,
            ].map((target) => formatNumber(target));

            const { top, bottom } = convertEvaluateStatus(item.evaluateStatus);
            return (
              <li
                key={`relative_keyword_${index}`}
                onClick={(event) => {
                  const { offsetLeft, offsetWidth } =
                    getElementLocation('relative_linkout');

                  if (
                    event.clientX >= offsetLeft &&
                    event.clientX <= offsetLeft + offsetWidth
                  )
                    return;

                  _dispatch && isToggleOpen(_dispatch, false, item.id);
                }}
              >
                <header>
                  <div
                    className={`flex justify-between border-[1px] border-grey-300 bg-grey-50 py-[18px] px-[15px] text-M/Medium ${backgroundColor} cursor-pointer hover:bg-grey-300`}
                  >
                    {item.text}

                    <div className='flex items-center'>
                      <button
                        id='relative_linkout'
                        className='z-20 flex h-5 w-5 cursor-pointer items-center'
                        onClick={() => {
                          openBrowser(
                            `${convertShopeeSiteUrl(country!)}/search?keyword=${
                              item.text
                            }`,
                            sorted,
                          );
                          amplitudeData &&
                            _amplitudeMovedToSERP(
                              amplitudeData.param,
                              amplitudeData.keyword,
                              item.text,
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
                      <ReactSVG
                        className={`${
                          isFalsy(toggleEvent.find((event) => event.id === id))
                            ? 'z-0 -rotate-90'
                            : 'z-0 rotate-90'
                        } ml-[14px]`}
                        src='/assets/icons/outlined/LeftArrow.svg'
                      />
                    </div>
                  </div>
                </header>
                {status === false && (
                  <Fragment>
                    <main>
                      <div className='flex items-center bg-grey-50 text-center'>
                        <div className='m-5 flex w-full justify-around gap-10 xs:flex-col xs:items-center'>
                          <KeywordAnalysisCard
                            title='검색량'
                            grade={search}
                            rate={_searchCount}
                            rateText='월 검색량'
                          />
                          {totalSalesCount && (
                            <KeywordAnalysisCard
                              title='구매 전환'
                              grade={conversion}
                              rate={formatNumber(conversionRate)}
                              rateText='구매 전환율'
                              subRate={`${_searchCount} 건`}
                              subRateText='검색량'
                              secondSubRate={`${totalSalesCount} 건`}
                              secondSubRateText='판매량 합계'
                            />
                          )}
                          <KeywordAnalysisCard
                            title='노출 경쟁'
                            grade={competition}
                            rate={competitionRate}
                            rateText='노출 경쟁률'
                            subRate={`${_searchCount} 건`}
                            subRateText='검색량'
                            secondSubRate={`${_competitionProductCount} 건`}
                            secondSubRateText='경쟁상품 수'
                          />
                          <KeywordAnalysisCard
                            title='CPC 비율'
                            grade={cpc}
                            rate={_cpcRate}
                            rateText='CPC 비율'
                            subRate={`${_cpcPrice} 원`}
                            subRateText='CPC'
                            secondSubRate={`${_avgPrice} 원`}
                            secondSubRateText='평균 판매가'
                          />
                        </div>
                      </div>
                    </main>
                    <footer>
                      <div className='bg-grey-200 p-2.5'>
                        <div className=' border-[1px] border-grey-300 bg-white'>
                          <div className='py-3 px-3'>
                            <h1 className='text-M/Bold text-grey-900'>요약</h1>
                            <div className='pt-1'>
                              <div className='break-all text-S/Regular text-grey-900'>
                                {top}
                              </div>
                              <div className='break-all text-S/Regular text-grey-900'>
                                {bottom}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </Fragment>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
