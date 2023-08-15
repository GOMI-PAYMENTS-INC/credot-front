import { Dispatch, Fragment, useMemo } from 'react';
import { ReactSVG } from 'react-svg';

import { BATCH_STATUS } from '@/types/enum.code';

import { isFalsy } from '@/utils/isFalsy';
import { isIncluded } from '@/utils/isIncluded';
import { openBrowser } from '@/utils/openBrowser';
import { convertShopeeSiteUrl } from '@/utils/convertEnum';
import { getElementLocation } from '@/utils/getElementLocation';
import { replaceOverLength } from '@/utils/replaceOverLength';

import { isToggleOpen } from '@/report/container';
import { KeywordAnalysisCard } from '@/report/keyword/elements';
import { convertEvaluateStatus } from '@/report/constants/Score';

import { TReportAction } from '@/report/reducer';
import { _getRelationReport } from '@/report/container';
import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { CountryType } from '@/generated/graphql';

interface IRecommendationChart {
  relations: TRelationReport[] | null;
  country: CountryType | null;
  itemCount: number;
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
    itemCount,
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
            const status = isFalsy(toggleEvent.find((event) => event.id === item.id));
            const backgroundColor = status ? 'border-grey-300' : 'bg-grey-100';
            const { id } = item;

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
                    <p className='xs:hidden'>{item.text}</p>

                    <div className='hidden items-center xs:flex'>
                      {replaceOverLength(item.text, 30)}
                      <button
                        id='relative_linkout'
                        className='z-20 ml-2 h-5 w-5 cursor-pointer items-center'
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
                    </div>

                    <div className='flex items-center'>
                      <button
                        id='relative_linkout'
                        className='z-20 flex h-5 w-5 cursor-pointer items-center xs:hidden'
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
                      <KeywordAnalysisCard analysisInfo={item} />
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
