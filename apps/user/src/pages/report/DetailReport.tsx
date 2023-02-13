import { Fragment, useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMainReport } from '@/containers/report/report.api';
import { isFalsy } from '@/utils/isFalsy';
import { _getMainReport } from '@/containers/report/report.container';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { ReactSVG } from 'react-svg';

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
          <div className='shrink-0'>
            <h1 className='text-XL/Medium text-grey-900'>리포트</h1>
          </div>
        </div>
      </div>

      <div className='col-span-10 mt-[116px]'>
        <main className='space-y-[72px]'>
          <section className='col-span-full  h-[168px] w-[980px] bg-slate-200'>
            <div className='py-8 pl-2'>
              <div className='flex  justify-between'>
                <h1 className='text-3XL/Bold text-gray-900'>{main.text}</h1>

                <button className='button-filled-normal-medium-grey-false-true-true mr-[7px] flex w-[165px] items-center justify-center'>
                  키워드 검색결과
                  <ReactSVG className='ml-1' src='/assets/icons/outlined/Linkout.svg' />
                </button>
              </div>
              <div className='mt-4 text-S/Medium even:space-x-2'>
                <span className=' text-grey-600'>국가</span>
                <span className=' text-grey-800'>베트남</span>
                <span className=' text-grey-600'>플랫폼</span>
                <span className=' text-grey-800'>쇼피(Shoppee)</span>
                <span className=' text-grey-600'>생성일</span>
                <span className=' text-grey-800'>2023.02.05</span>
              </div>
              <div className='mt-2 text-S/Medium odd:space-x-2'>
                <span className=' text-grey-600'>기준</span>
                <span className=' text-grey-800'>연관도순</span>
                <span className=' text-grey-600'>생성일 기준 환율</span>
                <span className=' text-grey-800'>1VND = 0.053 KRW</span>
              </div>
            </div>
          </section>
          <section className='col-span-full  h-[156px] w-[980px] bg-slate-200'>
            <div>
              <h1>시장규모</h1>
            </div>
          </section>
          <section className='col-span-full h-[376px] w-[980px] bg-slate-200'>
            <div>
              <h1>키워드 정보</h1>
            </div>
            <div>
              <h1>요약</h1>
            </div>
          </section>
        </main>
      </div>
      <aside className='col-span-2 mt-[116px] h-full w-[180px] bg-slate-100 '>
        <h1 className='ml-6 py-1 text-S/Medium text-gray-700'>목차</h1>
      </aside>
    </Fragment>
  );
};

export default DetailReport;
