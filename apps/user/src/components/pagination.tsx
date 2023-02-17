import { Dispatch, Fragment } from 'react';

import { ReactSVG } from 'react-svg';

type TPagination = {
  total: number;
  page: number; // 페이징용 리포트id
  limit: number; // 페이징용 리스트 사이즈
  data: TReportListResponseData;
  _dispatch: Dispatch<any>;
  _dispatchType: any;
};

function Pagination({ total, limit, page, data, _dispatch, _dispatchType }: TPagination) {
  // 총 페이지 갯수
  const numPages = Math.ceil(total / limit);

  return (
    <div className='flex max-w-[390px] justify-between space-x-8'>
      <button
        onClick={() =>
          _dispatch({
            type: _dispatchType,
            payload: {
              limit: limit,
              page: page - 1,
              data: data,
            },
          })
        }
        disabled={page === 1}
        className=''
      >
        <ReactSVG
          src='/assets/icons/outlined/ChevronLeft.svg'
          className='flex h-8 w-8 cursor-pointer items-center justify-center'
          beforeInjection={(svg) => {
            svg.setAttribute('class', 'w-4 h-4 fill-grey-600');
          }}
        />
      </button>
      <ul className='flex space-x-1'>
        {Array.from({ length: numPages }, (_, i) => (
          <li className='flex items-center justify-center' key={i}>
            <button
              key={i + 1}
              className={`h-[28px]   w-[28px] text-S/Medium ${
                i + 1 === page ? 'text-orange-500' : 'text-grey-900'
              }`}
              onClick={() =>
                _dispatch({
                  type: _dispatchType,
                  payload: {
                    limit: limit,
                    page: i + 1,
                    data: data,
                  },
                })
              }
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          _dispatch({
            type: _dispatchType,
            payload: {
              limit: limit,
              page: page + 1,
              data: data,
            },
          })
        }
        disabled={page === numPages}
        className=''
      >
        <ReactSVG
          src='/assets/icons/outlined/ChevronLeft.svg'
          className='flex h-8 w-8 cursor-pointer items-center justify-center'
          beforeInjection={(svg) => {
            svg.setAttribute('class', 'w-4 h-4 fill-grey-700 rotate-180');
          }}
        />
      </button>
    </div>
  );
}

export default Pagination;
