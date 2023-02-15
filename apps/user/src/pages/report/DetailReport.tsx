import { Fragment, useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { KeywordInfo } from '@/pages/report/KeywordInfo';
import { MartketSize } from '@/pages/report/MarketSize';
import { AnalysisKeyword } from '@/pages/report/AnalysisKeyword';
import { RecommendationOfKeyword } from '@/pages/report/RecommendationOfKeywrod';

import { isFalsy } from '@/utils/isFalsy';
import { _getMainReport } from '@/containers/report/report.container';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { ReactSVG } from 'react-svg';
import { isTruthy } from '@/utils/isTruthy';

const DetailReport = () => {
  const routeId = useParams();
  const [_state, _dispatch] = useReducer(reportReducer, reportInitialState);
  const { main, relation } = _state;

  useEffect(() => {
    if (isFalsy(routeId)) return;
    if (routeId.id) {
      _getMainReport(routeId.id, _dispatch);
    }
  }, []);

  return (
    <Fragment>
      <div className='absolute w-full px-[30px]'>
        <div className='flex h-[84px] items-center border border-t-0 border-b-gray-200 bg-white  px-6'>
          <div className='flex items-center'>
            <div
              className='h-5 w-5 cursor-pointer pl-[7px]'
              onClick={() => console.log('hi')}
            >
              <ReactSVG src='/assets/icons/outlined/LeftArrow.svg' />
            </div>
            <h1 className='ml-[14px] text-2XL/Bold text-grey-900'>리포트</h1>
          </div>
        </div>
      </div>

      <div className='col-span-10 mt-[116px]'>
        <main className='space-y-[72px]'>
          {isTruthy(main.createdAt) && (
            <Fragment>
              <KeywordInfo keywordInfo={main} />
              <MartketSize marketSize={main} />
              <AnalysisKeyword analysisInfo={main} />
              <RecommendationOfKeyword />
            </Fragment>
          )}
          <section></section>
        </main>
      </div>
      <aside className='col-span-2 mt-[116px] w-[180px] bg-slate-100 '>
        <h1 className='ml-6 py-1 text-S/Medium text-gray-700'>목차</h1>
      </aside>
    </Fragment>
  );
};

export default DetailReport;
