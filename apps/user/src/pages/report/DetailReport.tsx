import { Fragment, useReducer, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { KeywordInfo } from '@/pages/report/KeywordInfo';
import { MartketSize } from '@/pages/report/MarketSize';
import { AnalysisKeyword } from '@/pages/report/AnalysisKeyword';
import { RecommendationOfKeyword } from '@/pages/report/RecommendationOfKeywrod';
import { scrollToTop } from '@/utils/scrollToTop';

import { isFalsy } from '@/utils/isFalsy';
import { _getMainReport } from '@/containers/report/report.container';
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
    if (isFalsy(routeId)) return;
    if (routeId.id) {
      _getMainReport(routeId.id, _dispatch);
    }
  }, []);

  const combinedComponent = useMemo(() => {
    // createdAt이 null인 경우는 데이터가 아예 존재하지 않는 경우 -> 어떤 페이지를 보여줄지 여쭤봐야함
    if (main.createdAt === null) return <Fragment />;
    return (
      <Fragment>
        <KeywordInfo keywordInfo={main} />
        <MartketSize marketSize={main} />
        <AnalysisKeyword analysisInfo={main} />
        <RecommendationOfKeyword />
      </Fragment>
    );
  }, [main]);

  return (
    <Fragment>
      <div className='absolute w-full px-[30px]'>
        <div className='flex h-[84px] items-center border border-t-0 border-b-gray-200 bg-white  px-6'>
          <div className='flex items-center'>
            <div
              className='h-5 w-5 cursor-pointer pl-[7px]'
              onClick={() => navigation(PATH.GET_REPORT_LIST)}
            >
              <ReactSVG src='/assets/icons/outlined/LeftArrow.svg' />
            </div>
            <h1 className='ml-[14px] text-2XL/Bold text-grey-900'>리포트</h1>
          </div>
        </div>
      </div>

      <div className='col-span-10 mt-[116px]'>
        <main className='space-y-[72px]'>
          {combinedComponent}
          <section></section>
        </main>
      </div>
      <aside className='col-span-2 mt-[116px] w-[180px] bg-slate-100 '>
        <h1 className='ml-6 py-1 text-S/Medium text-gray-700'>목차</h1>
        <button
          className='fixed right-[60px] bottom-8 flex h-11 w-11 items-center justify-center rounded-md border-[1px] bg-white'
          onClick={() => scrollToTop()}
        >
          <ReactSVG src='/assets/icons/outlined/ToTop.svg' />
        </button>
      </aside>
    </Fragment>
  );
};

export default DetailReport;
