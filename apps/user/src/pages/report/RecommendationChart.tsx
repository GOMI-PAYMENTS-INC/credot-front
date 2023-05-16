import { Dispatch, Fragment } from 'react';
import { ReactSVG } from 'react-svg';
import { useParams } from 'react-router-dom';

import { BATCH_STATUS } from '@/types/enum.code';
import { EmptyRecommendation } from '@/pages/report/EmptyRecommendation';
import { isFalsy } from '@/utils/isFalsy';
import { isIncluded } from '@/utils/isIncluded';

import { openBrowser, roundNumber } from '@/containers/report';
import {
  convertRecommendationScoreToText,
  convertEvaluateStatus,
} from '@/constants/report.constant';
import { formatNumber } from '@/utils/formatNumber';

import { TReportAction } from '@/containers/report/report.reducer';
import { isToggleOpen } from '@/containers/report';
import {
  _getRelationReport,
  delayEvent,
  buttonSpinnerEvent,
  convertExchangeRate,
} from '@/containers/report/report.container';
import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { convertShopeeSiteUrl } from '@/utils/convertEnum';
import { CountryType } from '@/generated/graphql';
interface IRecommendationChart {
  relation: TGetRelationReportDataType[];
  country: CountryType;
  _dispatch: Dispatch<TReportAction>;
  toggleEvent: { id: number; isOpen: boolean }[];
  spinnerEvent: boolean;
  currencyUnit: number;
  basePrice: number;
  amplitudeData: TAmplitudeDetailData;
}

export const RecommendationChart = (props: IRecommendationChart) => {
  const {
    amplitudeData,
    relation,
    country,
    _dispatch,
    toggleEvent,
    spinnerEvent,
    currencyUnit,
    basePrice,
  } = props;
  const batchStatusDoneItems = relation.filter((data) =>
    isIncluded(data.batchStatus, BATCH_STATUS.DONE, BATCH_STATUS.REPLICATE),
  );
  const isDone = relation.length === batchStatusDoneItems.length;

  const routeId = useParams();
  return (
    <section className='pt-10'>
      <table className='col-span-full h-full w-full  table-auto bg-white'>
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
          {isFalsy(relation) && (
            <Fragment>
              <tr className='mt-3 flex' />
              <EmptyRecommendation />
            </Fragment>
          )}

          {isFalsy(relation) === false && isFalsy(batchStatusDoneItems) && (
            <Fragment>
              <tr className='mt-3 flex' />
              <tr>
                <td colSpan={10}>
                  <div className='relative flex items-center justify-center'>
                    <img
                      src='/assets/images/EmptyRow.png'
                      className='relative border-[1px] border-grey-300'
                    />
                    <div className='absolute flex flex-col items-center justify-center border-[1px] border-grey-300 bg-white'>
                      <div className='flex py-3 px-3'>
                        <p className=' text-S/Regular'>
                          추천 키워드의 정보를 수집중이에요. <br /> 새로고침을 통해
                          수집현황을 확인해주세요.
                        </p>
                        <div className='flex pl-[26px]'>
                          <button
                            className='button-outlined-small-xLarge-primary-false-false-true relative'
                            onClick={() => {
                              void _getRelationReport(routeId.id!, _dispatch);
                              buttonSpinnerEvent(_dispatch);
                              delayEvent(() => buttonSpinnerEvent(_dispatch), 1000);
                            }}
                          >
                            {spinnerEvent ? (
                              <div className='flex h-4 w-[76px]  items-center justify-center px-[18px]'>
                                <div className='absolute scale-[0.12] '>
                                  <div id='loader' />
                                </div>
                              </div>
                            ) : (
                              <p className='px-[18px]'>새로고침</p>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </Fragment>
          )}

          {isFalsy(relation) === false &&
            isFalsy(batchStatusDoneItems) === false &&
            batchStatusDoneItems.map((data, idx) => {
              const [search, competiton, cpc] = data.evaluateStatus;
              const status = isFalsy(toggleEvent.find((event) => event.id === data.id));
              const backgroundColor = status ? 'border-grey-300' : 'border-orange-200';
              const { top, bottom } = convertEvaluateStatus(data.evaluateStatus);
              return (
                <Fragment key={`product_key_${data.id}`}>
                  <tr className='mt-3 flex' />
                  <tr
                    className={`border-[1px] ${backgroundColor} cursor-pointer hover:bg-grey-200`}
                    onClick={() => isToggleOpen(_dispatch, false, data.id)}
                  >
                    <td>
                      <div className='ml-3 flex w-[114px]'>
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
                          <p className='text-S/Bold'>
                            {formatNumber(data.cpcRate)}%
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='flex flex-col flex-wrap-reverse py-3 pr-3'>
                        <div className='bordered flex h-5 w-[58px] justify-end '>
                          <p className='pl-0.5 text-XS/Medium'>
                            {formatNumber(
                              roundNumber(
                                convertExchangeRate(
                                  currencyUnit,
                                  data.cpcPrice,
                                  basePrice,
                                ),
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
                                convertExchangeRate(
                                  currencyUnit,
                                  data.avgPrice,
                                  basePrice,
                                ),
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
                              `${convertShopeeSiteUrl(country)}/search?keyword=${
                                data.text
                              }`,
                            );
                            _amplitudeMovedToSERP(
                              amplitudeData.reportId,
                              amplitudeData.keyword,
                              data.text,
                            );
                          }}
                        >
                          <ReactSVG
                            className=''
                            src='/assets/icons/outlined/Linkout.svg'
                          />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className='flex justify-center'>
                        <div className='flex h-5 w-5'>
                          <ReactSVG
                            className={
                              isFalsy(toggleEvent.find((event) => event.id === data.id))
                                ? 'z-0 -rotate-90'
                                : 'z-0 rotate-90'
                            }
                            src='/assets/icons/outlined/LeftArrow.svg'
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  {status === false && (
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
                  {idx === batchStatusDoneItems.length - 1 && isDone === false && (
                    <Fragment>
                      <tr className='mt-3 flex' />
                      <tr>
                        <td colSpan={10}>
                          <div className='relative flex items-center justify-center'>
                            <img
                              src='/assets/images/EmptyRow.png'
                              className='relative border-[1px] border-grey-300'
                            />
                            <div className='absolute flex flex-col items-center justify-center border-[1px] border-grey-300 bg-white'>
                              <div className='flex py-3 px-3'>
                                <p className=' text-S/Regular'>
                                  추천 키워드의 정보를 수집중이에요. <br /> 새로고침을
                                  통해 수집현황을 확인해주세요.
                                </p>
                                <div className='flex pl-[26px]'>
                                  <button
                                    className='button-outlined-small-xLarge-primary-false-false-true relative'
                                    onClick={() => {
                                      void _getRelationReport(routeId.id!, _dispatch);
                                      buttonSpinnerEvent(_dispatch);
                                      delayEvent(
                                        () => buttonSpinnerEvent(_dispatch),
                                        1000,
                                      );
                                    }}
                                  >
                                    {spinnerEvent ? (
                                      <div className='flex h-4 w-[76px]  items-center justify-center px-[18px]'>
                                        <div className='absolute scale-[0.12] '>
                                          <div id='loader' />
                                        </div>
                                      </div>
                                    ) : (
                                      <p className='px-[18px]'>새로고침</p>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  )}
                </Fragment>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};
