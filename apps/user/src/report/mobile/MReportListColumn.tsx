import { PATH } from '@/types/enum.code';
import { StatusTag } from '@/components/statusTag';
import { convertTime } from '@/utils/parsingTimezone';
import { ReactSVG } from 'react-svg';
import { Link, useNavigate } from 'react-router-dom';
import { onCheckReportList, reportListConverter } from '@/report/container';
import { Dispatch, Fragment } from 'react';
import { replaceOverLength } from '@/utils/replaceOverLength';

type TReportListColumn = {
  _state: TReportListState;
  _dispatch: Dispatch<TReportListAction>;
};
export const MReportListColumn = ({ _state, _dispatch }: TReportListColumn) => {
  const navigate = useNavigate();

  const ListColumn = () => {
    return (
      <Fragment>
        {_state.data.reports.length > 0 ? (
          _state.data.reports.map((report: TReportItem, idx) => {
            const reportConverterData = reportListConverter(report);
            const isDone = report.status === 'DONE';
            return (
              <tr
                className={`flex items-center justify-between border border-l-0 border-r-0 border-t-0 border-grey-200 last:border-b-0 hover:bg-grey-200 ${
                  isDone ? 'text-grey-800' : 'bg-grey-100 opacity-50'
                }`}
                onClick={() => {
                  if (isDone)
                    navigate(
                      `${PATH.REPORT_LIST}/${report.id}?limit=${_state.limit}&page=${_state.page}`,
                    );
                }}
                key={`table_row_${idx}`}
              >
                <td className='flex text-M/Medium'>
                  <div className='my-2.5 flex h-[53px] items-center'>
                    <ReactSVG
                      src={reportConverterData.countryCode.iconPath}
                      className='ml-[30px] mr-[17px]'
                      beforeInjection={(svg) => {
                        svg.setAttribute('class', 'w-4 h-4');
                      }}
                    ></ReactSVG>
                  </div>

                  <div className='my-2.5 flex  h-[53px] flex-col justify-center'>
                    <p>{replaceOverLength(report.keyword, 23)}</p>
                    <p className='text-S/Medium text-grey-700'>
                      {isDone
                        ? convertTime(report.createdAt.toString(), 'YYYY.MM.DD')
                        : '-'}
                    </p>
                  </div>
                </td>

                <td>
                  <div className='mr-5 flex'>
                    <StatusTag
                      text={reportConverterData.status.text}
                      sentiment={reportConverterData.status.sentiment}
                    ></StatusTag>

                    <ReactSVG
                      src='/assets/icons/outlined/ChevronRight2.svg'
                      beforeInjection={(svg) => {
                        svg.setAttribute('class', `w-6 fill-grey-600`);
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr className='bg-white'>
            <td colSpan={8}>
              <div className='grid justify-items-center pt-[104px] text-center'>
                <img src={`/assets/images/EmptyBox.png`} alt='검색 결과 없음 아이콘' />
                <div className='mt-4 text-L/Medium'>
                  <p>조회 가능한 리포트가 없어요.</p>
                  <p>키워드를 검색하여 리포트를 생성해보세요.</p>
                </div>
                <div className='mt-10'>
                  <button
                    onClick={() => navigate(PATH.SEARCH_PRODUCTS)}
                    className='button-outlined-normal-large-primary-false-false-true min-w-[160px]'
                  >
                    키워드 검색하기
                  </button>
                </div>
              </div>
            </td>
          </tr>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {_state.spinnerEvent === false ? (
        <tr className='flex justify-center bg-white'>
          <td colSpan={8}>
            <div className='grid justify-items-center pt-[255px] text-center'>
              <div className='scale-[0.3]'>
                <div id='loader' />
              </div>
            </div>
          </td>
        </tr>
      ) : (
        <ListColumn />
      )}
    </Fragment>
  );
};
