import { useReducer } from 'react';
import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import { ModalComponent } from '@/components/modals/ModalComponent';

import {
  _getReportList,
  getReportListByPage,
  onClickDeleteReport,
  onClickReload,
} from '@/report/container';
import { reportListInitialState, reportListReducer } from '@/report/reducer';
import { MReportListColumn } from '@/report/mobile/MReportListColumn';

import { ReportListDeleteModal } from '@/report/elements/ReportListDeleteModal';
import { MODAL_SIZE_ENUM } from '@/types/enum.code';
import { mobileScrollToTop } from '@/utils/scrollController';
import { formatNumber } from '@/utils/formatNumber';

import { useSearchParams } from 'react-router-dom';

export const MReportList = () => {
  const [_state, _dispatch] = useReducer(reportListReducer, reportListInitialState);
  const [searchParams, setSearchParams] = useSearchParams();

  //페이지 목록 불러오기
  useEffect(() => {
    // Get a specific query parameter
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');
    mobileScrollToTop(window.innerWidth);
    if (limit && page) {
      getReportListByPage(_dispatch, Number(limit), undefined, Number(page));
    } else {
      _getReportList({ _state: _state, _dispatch });
    }
  }, []);

  return (
    <section className='hidden grow overflow-y-hidden xs:block'>
      <div className='min-h-full bg-grey-50'>
        <div className='container'>
          {/*하단 페이지 별로 변경해야하는 부분*/}
          <div className='flex w-full flex-col'>
            {/* 테이블 */}
            <div className='fixed top-[65px] z-10 flex w-full flex-col rounded border border-grey-300 bg-white'>
              <div className=' flex h-[68px] items-center justify-between p-4'>
                <h1 className='text-L/Bold text-grey-800'>리포트 조회</h1>
                <div className='flex items-center space-x-3'>
                  <h1 className='text-M/Regular text-grey-700'>
                    총 {formatNumber(_state.data.totalCount)}개
                  </h1>
                  <button
                    className='button-filled-normal-medium-grey-true-false-true'
                    onClick={() => onClickReload(_state, _dispatch)}
                  >
                    <ReactSVG
                      src='/assets/icons/outlined/Reload.svg'
                      beforeInjection={(svg) => {
                        svg.setAttribute('class', 'w-4 h-4 fill-grey-800');
                      }}
                    ></ReactSVG>
                  </button>
                </div>
                <ModalComponent isOpen={_state.isDeleteConfirmModalOpen}>
                  <ReportListDeleteModal
                    _state={_state}
                    _dispatch={_dispatch}
                    size={MODAL_SIZE_ENUM.SMALL}
                  />
                </ModalComponent>
              </div>
              <div className='flex justify-between bg-grey-100 px-[30px] text-XS/Medium'>
                <p className='px-4 py-3'>검색어</p>
                <p className='px-4 py-3'>수집상태</p>
              </div>
            </div>
          </div>

          <table className='mt-[173px] h-full w-full'>
            <tbody
              id='scrollbar'
              className={`block h-[${window.innerHeight - 133}px] overflow-y-scroll`}
            >
              <MReportListColumn _state={_state} _dispatch={_dispatch} />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
