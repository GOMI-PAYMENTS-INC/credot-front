import { Dispatch, Fragment, useMemo } from 'react';
import { ReactSVG } from 'react-svg';
import { BATCH_STATUS } from '@/types/enum.code';

import { isFalsy } from '@/utils/isFalsy';
import { isIncluded } from '@/utils/isIncluded';
import { getElementLocation } from '@/utils/getElementLocation';
import { replaceOverLength } from '@/utils/replaceOverLength';

import { _getRelationReport, isToggleOpen } from '@/report/container';
import { isOverArea, moveToShopee } from '@/report/keyword/container';
import { KeywordAnalysisCard } from '@/report/keyword/elements';
import { convertEvaluateStatus } from '@/report/constants/Score';

import { TReportAction } from '@/report/reducer';
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
  const { amplitudeData, relations, country, _dispatch, toggleEvent, sorted } = props;

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
              <li key={`relative_keyword_${index}`}>
                <header
                  onClick={(event) => {
                    const linkout = getElementLocation('relative_linkout');
                    const report = getElementLocation('relative_report_generator');

                    if (
                      isOverArea(event.clientX, linkout) ||
                      isOverArea(event.clientX, report)
                    )
                      return;

                    _dispatch && isToggleOpen(_dispatch, false, item.id);
                  }}
                >
                  <div
                    className={`flex justify-between border-[1px] border-grey-300 bg-grey-50 py-[18px] px-[15px] text-M/Medium ${backgroundColor} h-[60px] cursor-pointer hover:bg-grey-300`}
                  >
                    <p>
                      {window.innerWidth > 432
                        ? item.text
                        : replaceOverLength(item.text, 22)}
                    </p>

                    <div className='flex items-center gap-5 xs:gap-[14px]'>
                      <button
                        id='relative_report_generator'
                        className='rounded-md border-[1px] border-orange-600 bg-orange-100 p-2.5'
                        onClick={() => {
                          console.log(item, ':item');
                        }}
                      >
                        <ReactSVG
                          className=''
                          src='/assets/icons/outlined/CarbonReport.svg'
                          beforeInjection={(svg) =>
                            svg.setAttribute('class', 'fill-orange-400')
                          }
                        />
                      </button>

                      <button
                        id='relative_linkout'
                        className='z-20 flex h-5 w-5 cursor-pointer items-center'
                        onClick={() =>
                          moveToShopee(country!, item.text, sorted, amplitudeData)
                        }
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
                        } `}
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

                      <button
                        className='button-filled-xLarge-primary-false-false-false my-[30px] hidden w-full xs:block'
                        onClick={(event) => {
                          event.preventDefault();
                          console.log(item, 'item');
                        }}
                      >
                        이 키워드로 리포트 생성하기
                      </button>
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
