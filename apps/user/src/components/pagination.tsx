import { Dispatch, Fragment } from 'react';

import { ReactSVG } from 'react-svg';
import { _getReportList } from '@/containers/report';

type TPagination = {
  total: number;
  page: number; // 페이징용 리포트id
  limit: number; // 페이징용 리스트 사이즈
  data: TReportListResponseData;
  _dispatch: Dispatch<any>;
  _dispatchType: any;
};

const Pagination = ({
  total,
  limit,
  page,
  data,
  _dispatch,
  _dispatchType,
}: TPagination) => {
  // 총 페이지 갯수
  const numPages = Math.ceil(total / limit);

  //최대 페이지 갯수
  const pagenationNum = 7;

  if (numPages) {
    return (
      <div className='flex h-8 max-w-[390px] justify-between space-x-8'>
        <button
          onClick={() =>
            _getReportList({
              _state: { limit: limit, page: page - 1 },
              _dispatch,
            } as TGetReportList)
          }
          disabled={page === 1}
          className={page === 1 ? '' : 'hover:rounded-lg hover:bg-grey-200'}
        >
          <ReactSVG
            src='/assets/icons/outlined/ChevronLeft.svg'
            className='flex h-8 w-8 cursor-pointer items-center justify-center'
            beforeInjection={(svg) => {
              svg.setAttribute(
                'class',
                `w-4 h-4 ${page === 1 ? 'fill-grey-400' : 'fill-grey-600'}`,
              );
            }}
          />
        </button>
        <ul className='flex space-x-1'>
          {Array.from({ length: numPages }, (_, i) => (
            <li className='flex items-center justify-center' key={i}>
              <button
                key={i + 1}
                className={`h-8 w-8 grow text-S/Medium hover:rounded-lg hover:bg-grey-200 ${
                  i + 1 === page ? 'text-orange-500' : 'text-grey-900'
                }`}
                onClick={() =>
                  _getReportList({
                    _state: { limit: limit, page: i + 1 },
                    _dispatch,
                  } as TGetReportList)
                }
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            _getReportList({
              _state: { limit: limit, page: page + 1 },
              _dispatch,
            } as TGetReportList)
          }
          disabled={page === numPages}
          className={page === numPages ? '' : 'hover:rounded-lg hover:bg-grey-200'}
        >
          <ReactSVG
            src='/assets/icons/outlined/ChevronLeft.svg'
            className='flex h-8 w-8 cursor-pointer items-center justify-center'
            beforeInjection={(svg) => {
              svg.setAttribute(
                'class',
                `w-4 h-4 rotate-180 ${
                  page === numPages ? 'fill-grey-400' : 'fill-grey-600'
                }`,
              );
            }}
          />
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
