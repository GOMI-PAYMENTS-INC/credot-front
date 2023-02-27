import { Dispatch, Fragment } from 'react';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
import { useParams } from 'react-router-dom';

import { BATCH_STATUS, TITLE } from '@/types/enum.code';
import { EmptyRecommendation } from '@/pages/report/EmptyRecommendation';
import { isFalsy } from '@/utils/isFalsy';
import { isIncluded } from '@/utils/isIncluded';

import { openBrowser, roundNumber } from '@/containers/report';
import {
  convertRecommendationScoreToText,
  convertEvaluateStatus,
} from '@/containers/report/report.constant';
import { formatNumber } from '@/utils/formatNumber';

import { TReportAction } from '@/containers/report/report.reducer';
import { isToggleOpen } from '@/containers/report';
import {
  _getRelationReport,
  delayEvent,
  buttonSpinnerEvent,
} from '@/containers/report/report.container';
interface IRecommendationOfKeyword {
  relation: TGetRelationReportDataType[];
  _dispatch: Dispatch<TReportAction>;
  toggleEvent: { id: number; isOpen: boolean }[];
  spinnerEvent: boolean;
}

export const RecommendationOfKeyword = (props: IRecommendationOfKeyword) => {
  const { relation, _dispatch, toggleEvent, spinnerEvent } = props;
  const batchStatusDoneItems = relation.filter((data) =>
    isIncluded(data.batchStatus, BATCH_STATUS.DONE),
  );
  const isDone = relation.length === batchStatusDoneItems.length;
  const routeId = useParams();
  return (
    <div>
      <h1 id={TITLE.RECOMMEND_KEYWORD} className='detailReport-h1-header'>
        추천 키워드
        <ReactSVG
          id='anchor-recommandation-keyword'
          src='/assets/icons/outlined/QuestionCircle.svg'
          className='inline-block pl-[7px]'
        />
        <Tooltip
          anchorId='anchor-recommandation-keyword'
          style={{ backgroundColor: 'white' }}
          place='right'
        >
          <div className='rounded-[3px] border-[1px] border-grey-200 bg-white px-4 py-4'>
            <p className='text-XS/Regular text-grey-900'>
              키워드와 함께 가장 많이 검색되는 연관성이 높은 키워드들이에요.
            </p>
          </div>
        </Tooltip>
      </h1>

      <table className=' col-span-full mt-6 h-full w-full  table-auto bg-white'>
        <thead className='h-[54px] border-t-[1px] border-b-[1px] border-grey-300 bg-grey-100 text-center'>
          <tr>
            <th className='w-[302px] text-left' colSpan={1}>
              <p className=' pl-3 text-XS/Medium'>키워드</p>
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
          {isFalsy(relation) ? (
            <Fragment>
              <tr className='mt-3 flex' />
              <EmptyRecommendation />
            </Fragment>
          ) : (
            batchStatusDoneItems.map((data, idx) => {
              const [search, competiton, cpc] = data.evaluateStatus;
              const status = isFalsy(toggleEvent.find((event) => event.id === data.id));
              const backgroundColor = status ? 'border-grey-300' : 'border-[#FFF5F0]';
              const { top, bottom } = convertEvaluateStatus(data.evaluateStatus);
              return (
                <Fragment key={`product_key_${data.id}`}>
                  <tr className='mt-3 flex' />
                  <tr
                    className={`border-[1px] ${backgroundColor} cursor-pointer hover:bg-grey-200`}
                    onClick={() => isToggleOpen(_dispatch, false, data.id)}
                  >
                    <td>
                      <div className='ml-[6px] flex w-[114px]'>
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
                          <p className='text-S/Bold'>{`${data.cpcRate}%`}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='flex flex-col flex-wrap-reverse py-3 pr-3'>
                        <div className='bordered flex h-5 w-[58px] justify-end '>
                          <p className='pl-0.5 text-XS/Medium'>
                            {formatNumber(data.cpcPrice)}
                          </p>
                          <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                        </div>
                        <hr className='my-[3px] ml-[62px] border-grey-300' />
                        <div className='bordered flex h-5 w-[58px] justify-end '>
                          <p className='pl-0.5 text-XS/Medium'>
                            {formatNumber(data.avgPrice)}
                          </p>
                          <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='flex justify-center'>
                        <div
                          className='flex h-5 w-5 cursor-pointer items-center'
                          onClick={() =>
                            openBrowser(`https://shopee.vn/search?keyword=${data.text}`)
                          }
                        >
                          <ReactSVG
                            className=''
                            src='/assets/icons/outlined/Linkout.svg'
                          />
                        </div>
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
                        className='border-[1px] border-[#FFF5F0] bg-orange-100'
                      >
                        <div className='bg-orange-100'>
                          <div className='my-2.5 mx-2.5 border-[1px] border-grey-300 bg-white'>
                            <div className='py-3 px-3'>
                              <h1 className='text-M/Bold text-grey-900'>요약</h1>
                              <div className='pt-1'>
                                <div className='break-all text-S/Regular text-gray-800'>
                                  {top}
                                </div>
                                <div className='break-all text-S/Regular text-gray-800'>
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
                                      _getRelationReport(routeId.id!, _dispatch);
                                      buttonSpinnerEvent(_dispatch);
                                      delayEvent(
                                        () => buttonSpinnerEvent(_dispatch),
                                        1000,
                                      );
                                    }}
                                  >
                                    {/* <div className='flex h-4 w-[76px]  items-center justify-center px-[18px]'>
                                      <div className='absolute scale-[0.12] '>
                                        <div id='loader' />
                                      </div>
                                    </div> */}
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
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
