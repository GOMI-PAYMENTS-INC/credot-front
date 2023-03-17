import { useReducer } from 'react';
import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import { Defalut as Layout } from '@/components/layouts';
import { ModalComponent } from '@/components/modals/modal';
import Pagination from '@/components/pagination';
import {
  _getReportList,
  onChangeOffsetCount,
  onCheckAllReportList,
  onClickDeleteReport,
  onClickReload,
} from '@/containers/report/report.container';
import {
  REPORT_LIST_ACTION,
  reportListInitialState,
  reportListReducer,
} from '@/containers/report/report.reducer';
import { ReportListColumn } from '@/pages/report/ReportListColumn';
import { ReportListDeleteModal } from '@/pages/report/ReportListDeleteModal';
import { MODAL_SIZE_ENUM } from '@/types/enum.code';
import { formatNumber } from '@/utils/formatNumber';

const ReportList = () => {
  const [_state, _dispatch] = useReducer(reportListReducer, reportListInitialState);

  //페이지 목록 불러오기
  useEffect(() => {
    _getReportList({ _state: _state, _dispatch });

    //리스트를 다시 불러올때 체크된 항목 초기화 함
    //페이징 후 체크된 항목이 유지되는 이슈 해결
    _dispatch({
      type: REPORT_LIST_ACTION.CHECKED_ITEM,
      payload: { checkedItems: reportListInitialState.checkedItems },
    });
  }, []);

  return (
    <Layout>
      {/*헤더*/}
      <header className='border-b-[1px] border-b-gray-200 bg-white'>
        <div className='container'>
          <div className='flex h-[84px] items-center'>
            <div className='shrink-0'>
              <h1 className='text-XL/Medium text-grey-900'>리포트 조회</h1>
            </div>
            <div className='shrink-0'>
              <span className='pl-[12px] text-S/Medium text-grey-700'>
                조회할 키워드 리포트를 선택해주세요.
              </span>
            </div>
          </div>
        </div>
      </header>
      {/*컨텐츠*/}
      <section className='grow overflow-y-auto'>
        <div className='min-h-full bg-grey-50'>
          <div className='container pt-[24px]'>
            {/*하단 페이지 별로 변경해야하는 부분*/}
            <div>
              {/* 테이블 */}
              <div className='mt-[24px] flex min-h-[693px] flex-col rounded rounded border border-grey-300 bg-white'>
                <div className='flex h-[68px] items-center justify-between p-4'>
                  <h1 className='text-M/Regular text-grey-800'>
                    총 {formatNumber(_state.data.totalCount)}개
                  </h1>
                  <div className='flex space-x-3'>
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
                      <span>새로고침</span>
                    </button>
                    <button
                      className='button-filled-normal-medium-grey-false-false-true'
                      onClick={() => onClickDeleteReport(_state.checkedItems, _dispatch)}
                    >
                      선택 삭제
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
                <table>
                  <thead className='h-[40px] border-t border-b border-grey-300 bg-grey-100 text-left'>
                    <tr>
                      <th className='w-[56px] text-center text-XS/Medium'>
                        <input
                          type='checkbox'
                          id='allCheck'
                          className='checkboxCustom peer'
                          checked={_state.isCheckedAll}
                          onChange={(evnet) =>
                            onCheckAllReportList(_state, _dispatch, evnet.target.checked)
                          }
                        />
                        <label
                          htmlFor='allCheck'
                          className='checkboxCustom-label  bg-[length:20px_20px] bg-[left_50%_top_50%] text-transparent'
                        >
                          전체 선택
                        </label>
                      </th>
                      <th className='w-[556px]'>
                        <div className='px-4 py-3 text-XS/Medium'>검색어</div>
                      </th>
                      <th className='w-[128px]'>
                        <div className='px-4 py-3 text-XS/Medium'>수집 상태</div>
                      </th>
                      <th className='w-[128px]'>
                        <div className='px-4 py-3 text-XS/Medium'>국가</div>
                      </th>
                      <th className='w-[128px]'>
                        <div className='px-4 py-3 text-XS/Medium'>쇼핑몰</div>
                      </th>
                      <th className='w-[128px]'>
                        <div className='px-4 py-3 text-XS/Medium'>리포트 생성일</div>
                      </th>
                      <th className='w-[56px]'>
                        <div className='px-4 py-3 text-XS/Medium'></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <ReportListColumn _state={_state} _dispatch={_dispatch} />
                  </tbody>
                </table>
              </div>

              <div className='relative my-[22px]'>
                <select
                  name='limit'
                  className='select-normal-default-false'
                  defaultValue={10}
                  onChange={(event) =>
                    onChangeOffsetCount(event, _state, _dispatch, _state.data.totalCount)
                  }
                >
                  <option value={10}>10개씩</option>
                  <option value={30}>30개씩</option>
                  <option value={50}>50개씩</option>
                  <option value={100}>100개씩</option>
                </select>
                <div className='absolute left-1/2 top-0 translate-x-[-50%]'>
                  <Pagination
                    total={_state.data.totalCount}
                    page={_state.page || reportListInitialState.page}
                    limit={_state.limit || reportListInitialState.limit}
                    data={_state.data}
                    _dispatch={_dispatch}
                    _dispatchType={REPORT_LIST_ACTION.GET_REPORT_LIST}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReportList;
