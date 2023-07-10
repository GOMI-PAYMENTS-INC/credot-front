import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import { Default } from '@/common/layouts';
import { ModalComponent } from '@/components/modals/ModalComponent';
import Pagination from '@/components/pagination';
import {
  _getReportList,
  getReportListByLimit,
  getReportListByPage,
  onCheckAllReportList,
  onClickDeleteReport,
  onClickReload,
} from '@/report/container';
import { reportListInitialState, reportListReducer } from '@/report/reducer';
import { ReportListColumn } from '@/report/elements/ReportListColumn';
import { ReportListDeleteModal } from '@/report/elements/ReportListDeleteModal';
import { MODAL_SIZE_ENUM } from '@/types/enum.code';
import { formatNumber } from '@/utils/formatNumber';
import DropDown, {
  DROPDOWN_STATUS,
  DROPDOWN_VARIANTS,
  TDropDownOption,
} from '@/components/dropDown';
import { useSearchParams } from 'react-router-dom';

const ReportList = () => {
  const [_state, _dispatch] = useReducer(reportListReducer, reportListInitialState);
  const [searchParams, setSearchParams] = useSearchParams();

  const setParams = (limit: string, page: string) => {
    if (limit && page) {
      setSearchParams({ limit: limit, page: page });
    }
  };

  //페이지 목록 불러오기
  useEffect(() => {
    // Get a specific query parameter
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');
    if (limit && page) {
      void getReportListByPage(_dispatch, Number(limit), undefined, Number(page));
    } else {
      void _getReportList({ _state: _state, _dispatch });
    }
  }, []);

  const limitOptions = () => {
    let result: TDropDownOption[] = [];
    const keys = [10, 30, 50, 100];
    keys.map((key) => {
      result.push({
        value: key,
        text: `${key}개씩`,
      });
    });
    return result;
  };
  const onClickOption = (limit: any) => {
    void getReportListByLimit(limit, _state, _dispatch, _state.data.totalCount);
    setParams(limit, String(_state.page));
  };
  return (
    <Default>
      {/*헤더*/}
      <header className='border-b-[1px] border-b-grey-200 bg-white'>
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
              <div className='mt-[24px] flex min-h-[693px] flex-col rounded border border-grey-300 bg-white'>
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
                        <div className='px-4 py-3 text-XS/Medium'>수집 기준</div>
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
                <DropDown
                  name='limit'
                  minWidth={120}
                  value={`${_state.limit}개씩`}
                  isUseIcon={false}
                  options={limitOptions()}
                  status={DROPDOWN_STATUS.FILLED}
                  variants={DROPDOWN_VARIANTS.DEFAULT}
                  onClickOption={onClickOption}
                ></DropDown>

                <div className='absolute left-1/2 top-0 translate-x-[-50%]'>
                  <Pagination
                    total={_state.data.totalCount}
                    page={_state.page || reportListInitialState.page}
                    limit={_state.limit || reportListInitialState.limit}
                    _dispatch={_dispatch}
                    setParams={setParams}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Default>
  );
};

export default ReportList;
