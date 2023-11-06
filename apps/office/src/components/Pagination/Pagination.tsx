import {  Fragment } from 'react';
import { ReactSVG } from 'react-svg';

type TPagination = {
  total: number;
  page: number; // 페이징용 리포트id
  limit: number; // 페이징용 리스트 사이즈

  setParams: (page: number) => void;
};

const Pagination = ({ total, limit, page, setParams }: TPagination) => {
  const onClickPage = async (requestPage: number) => {
    setParams(requestPage);
  };
  // 총 페이지 갯수
  const numPages = Math.ceil(total / limit);

  //출력시 최대 페이지 갯수
  const pageMaxNum = 8;

  const pageMaxCeil = Math.ceil(pageMaxNum / 2); //4

  const liStyle = 'flex items-center justify-center';
  const buttonStyle = (nowPage: number) =>
    `h-8 w-8 grow text-S/Medium hover:rounded-lg hover:bg-grey-200 ${
      nowPage === page ? 'text-orange-500' : 'text-grey-900'
    }`;
  const threeDotSvg = (
    <ReactSVG
      src='/assets/icons/outlined/MoreHorizontal.svg'
      className={'mx-5 flex h-[18px] w-[18px] items-center justify-center'}
      beforeInjection={(svg) => {
        svg.setAttribute('class', `w-[18px] h-[18px] fill-grey-600}`);
      }}
    />
  );

  const firstSection = () => {
    if (page - 1 >= pageMaxCeil) {
      return (
        <Fragment>
          <li className={liStyle}>
            <button key={1} className={buttonStyle(1)} onClick={() => onClickPage(1)}>
              {1}
            </button>
          </li>
          <li className={liStyle}>{threeDotSvg}</li>
        </Fragment>
      );
    } else {
      return Array.from(Array(pageMaxCeil + 1), (_, i) => (
        <li className={liStyle} key={i}>
          <button
            key={i + 1}
            className={buttonStyle(i + 1)}
            onClick={() => onClickPage(i + 1)}
          >
            {i + 1}
          </button>
        </li>
      ));
    }
  };

  const midSection = () => {
    if (page - 1 >= pageMaxCeil && numPages - page >= pageMaxCeil) {
      return Array.from({ length: 3 }, (_, i) => (
        <li className={liStyle} key={page + (i - 1)}>
          <button
            key={page + (i - 1)}
            className={buttonStyle(page + (i - 1))}
            onClick={() => onClickPage(page + (i - 1))}
          >
            {page + (i - 1)}
          </button>
        </li>
      ));
    }
  };

  const lastSection = () => {
    if (numPages - page >= pageMaxCeil) {
      return (
        <Fragment>
          <li className={liStyle}>{threeDotSvg}</li>
          <li className={liStyle}>
            <button
              key={numPages}
              className={buttonStyle(numPages)}
              onClick={() => onClickPage(numPages)}
            >
              {numPages}
            </button>
          </li>
        </Fragment>
      );
    } else {
      return Array.from(Array(pageMaxCeil + 1), (_, i) => (
        <li className={liStyle} key={numPages - (pageMaxCeil - i)}>
          <button
            key={numPages - (pageMaxCeil - i)}
            className={buttonStyle(numPages - (pageMaxCeil - i))}
            onClick={() => onClickPage(numPages - (pageMaxCeil - i))}
          >
            {numPages - (pageMaxCeil - i)}
          </button>
        </li>
      ));
    }
  };

  const paginationPrint = () => {
    if (pageMaxNum < numPages) {
      return (
        <Fragment>
          {firstSection()}
          {midSection()}
          {lastSection()}
        </Fragment>
      );
    } else {
      return Array.from({ length: numPages }, (_, i) => (
        <li className={liStyle} key={i}>
          <button
            key={i + 1}
            className={buttonStyle(i + 1)}
            onClick={() => onClickPage(i + 1)}
          >
            {i + 1}
          </button>
        </li>
      ));
    }
  };

  if (numPages) {
    return (
      <div className='flex h-8 max-w-[390px] justify-between space-x-8'>
        <button
          onClick={() => onClickPage(page - 1)}
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
        <ul className='flex gap-x-1'>{paginationPrint()}</ul>
        <button
          onClick={() => onClickPage(page + 1)}
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
