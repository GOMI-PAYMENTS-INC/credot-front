import React, { Fragment, useEffect, useMemo, useReducer, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import {
  _getReportInfo,
  convertTitle,
  isToggleOpen,
  onScrollDetail,
  openBrowser,
  scrollToTop,
  updateTitle,
} from '@/containers/report/report.container';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { AnalysisKeyword } from '@/pages/report/AnalysisKeyword';
import { KeywordInfo } from '@/pages/report/KeywordInfo';
import { MartketSize } from '@/pages/report/MarketSize';
import { RecommendationOfKeyword } from '@/pages/report/RecommendationOfKeywrod';
import { PATH } from '@/router/routeList';
import { TITLE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

import { SalePrice } from '@/pages/report/SalePrice';

const DetailReport = () => {
  const routeId = useParams();
  //TODO: useReducer는 부모 컴포넌트로부터 내려오는 구조로 변경할 것
  const [_state, _dispatch] = useReducer(reportReducer, reportInitialState);

  const { main, relation } = _state;
  const navigation = useNavigate();

  useEffect(() => {
    if (isFalsy(routeId.id)) return;
    if (routeId.id && _state.main.createdAt === null) {
      _getReportInfo(routeId.id, _dispatch);
    }
  }, []);

  const combinedComponent = useMemo(() => {
    // createdAt이 null인 경우는 데이터가 아예 존재하지 않는 경우 -> 어떤 페이지를 보여줄지 여쭤봐야함
    if (isFalsy(_state.salePrice)) return;
    return (
      <Fragment>
        <KeywordInfo keywordInfo={main} />
        <MartketSize marketSize={main} />
        <AnalysisKeyword analysisInfo={main} />
        <RecommendationOfKeyword
          spinnerEvent={_state.spinnerEvent}
          relation={relation}
          _dispatch={_dispatch}
          toggleEvent={_state.toggleEvent}
        />
        <SalePrice salePriceInfo={_state.salePrice} />
        <section className='h-[200px]'></section>
      </Fragment>
    );
  }, [main]);

  const contentSection = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      {/*헤더*/}
      <header className='border-b-[1px] border-b-gray-200 bg-white'>
        <div className='container'>
          <div className='flex h-[84px] items-center justify-between'>
            <div className='flex items-center'>
              <div
                className='h-5 w-5 cursor-pointer pl-[7px]'
                onClick={() => navigation(PATH.GET_REPORT_LIST)}
              >
                <ReactSVG src='/assets/icons/outlined/LeftArrow.svg' />
              </div>
              <h1 className='ml-[19px] text-2XL/Bold text-grey-900'>
                {convertTitle(_state.scrollEvent.title)}
              </h1>
              {_state.scrollEvent.title !== TITLE.REPORT && (
                <div className='flex h-5 w-5 cursor-pointer items-center pl-3'>
                  <ReactSVG
                    src='/assets/icons/outlined/Linkout.svg'
                    onClick={() =>
                      openBrowser(`https://shopee.vn/search?keyword=${main.text}`)
                    }
                  />
                </div>
              )}
            </div>
            {_state.scrollEvent.title !== TITLE.REPORT && (
              <div className='mr-2.5  w-[120px] rounded border-[1px] border-grey-300 text-center'>
                <p className='py-2.5 text-S/Regular'>상위 30개</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/*컨텐츠  */}
      <section
        className='grow overflow-y-scroll'
        onScroll={(event) => onScrollDetail(event, _dispatch, main)}
        ref={contentSection}
      >
        <div>
          <div className='container pt-8'>
            {/*하단 페이지 별로 변경해야하는 부분*/}
            <div className='grid grid-cols-12 gap-x-6'>
              <div className='col-span-10 space-y-10'>{combinedComponent}</div>

              <aside className='sticky top-8 col-span-2 h-fit w-[180px] '>
                <ul>
                  <li>
                    <p
                      className='flex cursor-pointer items-center text-S/Medium text-grey-700'
                      onClick={() => isToggleOpen(_dispatch, true)}
                    >
                      <ReactSVG
                        wrapper='span'
                        className={`mr-2.5  ${_state.scrollEvent.isOpen && 'rotate-90'}`}
                        src='/assets/icons/filled/CaretDown.svg'
                      />
                      목차
                    </p>
                  </li>
                  <ul>
                    {_state.scrollEvent.isOpen &&
                      Object.values(TITLE)
                        .filter((title) => title !== TITLE.REPORT)
                        .map((id, idx) => {
                          return (
                            <li
                              key={`menu-items-${id}`}
                              className={`flex h-9 cursor-pointer items-center hover:bg-grey-100 ${
                                idx === 0 && 'mt-1'
                              }`}
                            >
                              <a href={`#${id}`} className='flex-auto'>
                                <h1
                                  className={`ml-6 py-1 text-S/Regular  ${
                                    id === _state.scrollEvent.current
                                      ? 'text-orange-500'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {convertTitle(id)}
                                </h1>
                              </a>
                            </li>
                          );
                        })}
                  </ul>
                </ul>

                <button
                  className='fixed right-[60px] bottom-[100px] flex h-11 w-11 items-center justify-center rounded-md border-[1px] bg-white'
                  onClick={() => scrollToTop(_dispatch, contentSection)}
                >
                  <ReactSVG src='/assets/icons/outlined/ToTop.svg' />
                </button>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default DetailReport;
