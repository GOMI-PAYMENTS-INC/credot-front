import { PATH } from '@/router/routeList';
import { StatusTag } from '@/components/statusTag';
import { convertTime } from '@/utils/parsingTimezone';
import { ReactSVG } from 'react-svg';
import { Link, useNavigate } from 'react-router-dom';
import { capitalize } from '@/utils/capitalize';
import { reportListConverter } from '@/containers/report/report.container';
import { Dispatch, Fragment } from 'react';

type TReportListColumn = {
  response: TReportListResponseData;
  page?: number; // 페이징용 리포트id
  limit?: number; // 페이징용 리스트 사이즈
  checkedItems: Number[];
  setCheckedItems: Dispatch<Number[]>;

  setIsCheckedAll: Dispatch<boolean>;
};
export const ReportListColumn = ({
  response,
  checkedItems,
  setCheckedItems,
  setIsCheckedAll,
}: TReportListColumn) => {
  const navigate = useNavigate();

  const checkedItemHandler = (code: Number, isChecked: boolean) => {
    if (isChecked) {
      //체크 추가할때
      setCheckedItems([...checkedItems, code]);
    } else if (!isChecked && checkedItems.find((one) => one === code)) {
      //체크 해제할때 checkedItems에 있을 경우
      const filter = checkedItems.filter((one) => one !== code);
      setCheckedItems([...filter]);

      setIsCheckedAll(false);
    }
  };

  return (
    <Fragment>
      {response.reports.length > 0 ? (
        response.reports.map((report: TReportItem, idx) => {
          const reportConverterData = reportListConverter(report);

          let isChecked = false;
          isChecked = checkedItems.includes(report.id);

          return (
            <tr
              className={`border border-l-0 border-r-0 border-t-0 border-grey-200 ${
                report.status !== 'DONE' ? 'bg-grey-100 text-grey-700' : 'text-grey-800 '
              }`}
              key={`table_row_${idx}`}
            >
              <td className='text-center '>
                <input
                  type='checkbox'
                  name='reports[]'
                  id={`Check-${report.id}`}
                  className='checkboxCustom peer'
                  disabled={report.status !== 'DONE'}
                  onChange={(e) => checkedItemHandler(report.id, e.target.checked)}
                  checked={isChecked}
                />
                <label
                  htmlFor={`Check-${report.id}`}
                  className='checkboxCustom-label  bg-[length:20px_20px] bg-[left_50%_top_50%] text-transparent'
                >
                  선택
                </label>
              </td>
              <td className='p-4'>
                <p className='text-M/Regular'>
                  {report.status === 'DONE' ? (
                    <Link to={`${PATH.GET_REPORT_LIST}/${report.id}`}>
                      {report.keyword}
                    </Link>
                  ) : (
                    report.keyword
                  )}
                </p>
              </td>
              <td className='p-4'>
                <StatusTag
                  text={reportConverterData.status.text}
                  sentiment={reportConverterData.status.sentiment}
                ></StatusTag>
              </td>
              <td className='p-4'>
                <div className='flex items-center'>
                  <ReactSVG
                    src={reportConverterData.countryCode.iconPath}
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'w-4 h-4');
                    }}
                  ></ReactSVG>
                  <p className='ml-2 text-S/Regular'>
                    {reportConverterData.countryCode.text}
                  </p>
                </div>
              </td>
              <td className='p-4'>
                <div className='flex items-center'>
                  <ReactSVG
                    src={reportConverterData.channel.iconPath}
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'w-4 h-4');
                    }}
                  ></ReactSVG>
                  <p className='ml-2 text-S/Regular'>{capitalize(report.channel)}</p>
                </div>
              </td>
              <td className='p-4'>
                <p className='text-S/Regular'>
                  {report.status !== 'DONE' ? (
                    <span>-</span>
                  ) : (
                    convertTime(report.updatedAt.toString(), 'YYYY.MM.DD')
                  )}
                </p>
              </td>
              <td className='p-4'>
                <ReactSVG
                  src='/assets/icons/outlined/ChevronRight2.svg'
                  onClick={
                    report.status === 'DONE'
                      ? () => navigate(`${PATH.GET_REPORT_LIST}/${report.id}`)
                      : (e) => e.preventDefault()
                  }
                  beforeInjection={(svg) => {
                    svg.setAttribute(
                      'class',
                      `w-6  ${
                        report.status !== 'DONE' ? 'fill-grey-700' : 'fill-grey-600 '
                      }`,
                    );
                  }}
                />
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={8}>
            <div className='grid justify-items-center pt-[104px] text-center'>
              <img
                src={`/assets/assets/images/EmptyBox.png`}
                alt='검색 결과 없음 아이콘'
              />
              <div className='mt-4 text-L/Medium'>
                <p>조회 가능한 리포트가 없어요.</p>
                <p>키워드를 검색하여 리포트를 생성해보세요.</p>
              </div>
              <div className='mt-10'>
                <button
                  onClick={() => navigate(PATH.SEARCH_PRODUCTS)}
                  className='button-outlined-normal-large-primary-false-false-true'
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
