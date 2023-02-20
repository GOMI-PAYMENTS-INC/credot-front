import { Fragment, useReducer, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { KeywordInfo } from '@/pages/report/KeywordInfo';

import { MartketSize } from '@/pages/report/MarketSize';
import { AnalysisKeyword } from '@/pages/report/AnalysisKeyword';
import { RecommendationOfKeyword } from '@/pages/report/RecommendationOfKeywrod';

import { scrollToTop } from '@/utils/scrollToTop';
import { TITLE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';
import {
  convertTitle,
  updateTitle,
  isToggleOpen,
  openBrowser,
  _getReportInfo,
} from '@/containers/report/report.container';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { ReactSVG } from 'react-svg';
import { PATH } from '@/router/routeList';

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

  const ids = [TITLE.MARTKET_SIZE, TITLE.KEYWORD_INFO, TITLE.RECOMMEND_KEYWORD];

  const combinedComponent = useMemo(() => {
    // createdAt이 null인 경우는 데이터가 아예 존재하지 않는 경우 -> 어떤 페이지를 보여줄지 여쭤봐야함

    return (
      <Fragment>
        <KeywordInfo keywordInfo={main} />
        <MartketSize marketSize={main} />
        <AnalysisKeyword analysisInfo={main} />
        <RecommendationOfKeyword
          relation={relation}
          _dispatch={_dispatch}
          toggleEvent={_state.toggleEvent}
        />
        <section className='h-[200px]'></section>
      </Fragment>
    );
  }, [main]);
  //FIXME: 스크롤 이벤트 최적화하기
  document.addEventListener('scroll', () => {
    updateTitle(window.scrollY, _dispatch, main.text);
  });

  return (
    <Fragment>
      <div className='sticky top-0 z-10 col-span-full w-full'>
        <div className='flex h-[84px] items-center justify-between border-b-[1px] border-b-gray-200 bg-white'>
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
              <select name='countSelect' className='py-2.5 text-S/Regular' disabled>
                <option value={10}>상위 10개</option>
                <option value={20}>상위 20개</option>
                <option value={30}>상위 30개</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className='col-span-10 mt-8'>
        <main className='space-y-[72px]'>{combinedComponent}</main>
      </div>
      <aside className='sticky top-[116px] col-span-2 h-fit w-[180px] '>
        <ul>
          <p className='flex cursor-pointer items-center text-S/Medium text-grey-700'>
            <ReactSVG
              wrapper='span'
              className={`mr-2.5  ${_state.scrollEvent.isOpen && 'rotate-90'}`}
              src='/assets/icons/filled/CaretDown.svg'
              onClick={() => isToggleOpen(_dispatch, true)}
            />
            목차
          </p>
          {_state.scrollEvent.isOpen &&
            ids.map((id, idx) => {
              return (
                <li
                  key={`menu-items-${id}`}
                  className={`flex h-9 cursor-pointer items-center hover:bg-grey-100 ${
                    idx === 0 && 'mt-1'
                  }`}
                >
                  <a href={`#${id}`}>
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

        <button
          className='fixed right-[60px] bottom-[100px] flex h-11 w-11 items-center justify-center rounded-md border-[1px] bg-white'
          onClick={() => scrollToTop(_dispatch)}
        >
          <ReactSVG src='/assets/icons/outlined/ToTop.svg' />
        </button>
      </aside>
    </Fragment>
  );
};

export default DetailReport;
