import { Fragment, useReducer, useState } from 'react';
import { isIncluded } from '@/utils/isIncluded';
import { useEffect } from 'react';
import { formatNumber } from '@/utils/formatNumber';

import {
  _getReportList,
  onChangeSortCount,
  openDeleteModal,
} from '@/containers/report/report.container';
import {
  reportListReducer,
  reportListInitialState,
  REPORT_LIST_ACTION,
} from '@/containers/report/report.reducer';
import { ReportListColumn } from '@/pages/report/ReportListColumn';

import Pagination from '@/components/pagination';
import { BATCH_STATUS, MODAL_SIZE_ENUM } from '@/types/enum.code';
import { ReportListDeleteModal } from '@/pages/report/ReportListDeleteModal';
import { ModalComponent } from '@/components/modals/modal';

const ReportList = () => {
  const [_state, _dispatch] = useReducer(reportListReducer, reportListInitialState);

  //전체 선택 체크 여부
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  //체크한 item 배열
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const onCheckAll = (checked: boolean) => {
    //전체 선택
    if (checked) {
      const checkedItemsArray: number[] = [];
      _state.data.reports.forEach(
        (report) =>
          isIncluded(report.status, BATCH_STATUS.DONE) &&
          checkedItemsArray.push(report.id),
      );
      setCheckedItems(checkedItemsArray);

      setIsCheckedAll(true);
    } else {
      //전체 해제
      setCheckedItems([]);

      setIsCheckedAll(false);
    }
  };

  //페이지 목록 불러오기
  useEffect(() => {
    _getReportList({ _state: _state, _dispatch });

    //리스트를 다시 불러올때 체크된 항목 초기화 함
    //페이징 후 체크된 항목이 유지되는 이슈 해결
    setCheckedItems([]);
  }, [_state.page, _state.limit]);

  //선택 삭제 버튼 클릭 시
  const clickDeleteReport = () => {
    // 삭제 모달 노출
    openDeleteModal(checkedItems, _dispatch);
  };

  return (
    <Fragment>
      {/*헤더*/}
      <header className='border-b-[1px] border-b-gray-200 bg-white'>
        <div className='container'>
          <div className='flex h-[84px] items-center'>
            <div className='shrink-0'>
              <h1 className='text-XL/Medium text-grey-900'>리포트 조회</h1>
            </div>
            <div className='shrink-0'>
              <span className='pl-[12px] text-S/Medium text-grey-800'>
                조회할 키워드 리포트를 선택해주세요.
              </span>
            </div>
          </div>
        </div>
      </header>
      {/*컨텐츠*/}
      <section className='grow overflow-y-scroll'>
        <div className='min-h-screen bg-grey-50'>
          <div className='container pt-[24px]'>
            {/*하단 페이지 별로 변경해야하는 부분*/}
            <div className='min-h-[670px]'>
              {/* 테이블 */}
              <div className='col-span-full mt-[24px] flex min-h-[670px] flex-col rounded border border-grey-300 bg-white'>
                <div className='flex h-[68px] items-center justify-between p-4'>
                  <h1 className='text-M/Regular text-grey-800'>
                    총 {formatNumber(_state.data.totalCount)}개
                  </h1>
                  <button
                    className='button-filled-normal-medium-grey-false-false-true'
                    onClick={clickDeleteReport}
                  >
                    선택 삭제
                  </button>
                  <ModalComponent isOpen={_state.isDeleteConfirmModalOpen}>
                    <ReportListDeleteModal
                      checkedItems={checkedItems}
                      setCheckedItems={setCheckedItems}
                      _state={_state}
                      _dispatch={_dispatch}
                      size={MODAL_SIZE_ENUM.SMALL}
                    />
                  </ModalComponent>
                </div>
                <table className='col-span-full bg-white '>
                  <thead className='h-[40px] border-t border-b border-grey-300 bg-grey-100 text-left'>
                    <tr>
                      <th className='w-[56px] text-center text-XS/Medium'>
                        <input
                          type='checkbox'
                          id='allCheck'
                          className='checkboxCustom peer'
                          checked={isCheckedAll}
                          onChange={(e) => onCheckAll(e.target.checked)}
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
                    <ReportListColumn
                      response={_state.data}
                      page={_state.page || reportListInitialState.page}
                      limit={_state.limit || reportListInitialState.limit}
                      checkedItems={checkedItems}
                      setCheckedItems={setCheckedItems}
                      setIsCheckedAll={setIsCheckedAll}
                    />
                  </tbody>
                </table>
              </div>

              <div className='flex justify-between py-[22px]'>
                <select
                  name='limit'
                  defaultValue={10}
                  onChange={(event) => onChangeSortCount(event, _state, _dispatch)}
                  className='rounded-md
             border border-grey-400 px-3 py-2.5 text-S/Regular text-grey-900'
                >
                  <option value={10}>10개씩</option>
                  <option value={30}>30개씩</option>
                  <option value={50}>50개씩</option>
                  <option value={100}>100개씩</option>
                </select>
                <Pagination
                  total={_state.data.totalCount}
                  limit={_state.limit}
                  page={_state.page}
                  data={_state.data}
                  _dispatch={_dispatch}
                  _dispatchType={REPORT_LIST_ACTION.GetReportList}
                />
                <div className='opacity-0'>숨겨진 영역</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ReportList;
