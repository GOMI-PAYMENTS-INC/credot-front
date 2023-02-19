import { ChangeEvent, Fragment, useReducer, useState } from 'react';
import { isIncluded } from '@/utils/isIncluded';
import { useEffect } from 'react';
import { formatNumber } from '@/utils/formatNumber';

import { _getReportList } from '@/containers/report/report.container';
import {
  reportListReducer,
  reportListInitialState,
  ReportListActionKind,
} from '@/containers/report/report.reducer';
import { ReportListColumn } from '@/pages/report/ReportListColumn';

import Pagination from '@/components/pagination';
import { BATCH_STATUS } from '@/types/enum.code';

const ReportList = () => {
  const [_state, _dispatch] = useReducer(reportListReducer, reportListInitialState);
  // const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    let state: TReportListState;
    if (_state.page === undefined || _state.limit === undefined) {
      state = reportListInitialState;
    } else {
      state = _state;
    }

    _getReportList({ _state: state, _dispatch }).then((r) => {});
  }, [_state.page, _state.limit]);

  //전체 선택 체크 여부
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  //체크한 item 배열
  const [checkedItems, setCheckedItems] = useState<Number[]>([]);

  const onCheckAll = (checked: boolean) => {
    //전체 선택
    if (checked) {
      const checkedItemsArray: Number[] = [];
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

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const limit = Number(e.target.value);
    if (limit) {
      let statePram = {
        page: 1,
        limit: 10,
        data: {
          reports: [],
          totalCount: 0,
        },
      };

      statePram.page = _state.page;
      statePram.limit = limit;
      _getReportList({ _state: statePram, _dispatch }).then((r) => {
        if (r) {
          console.log(r);
        }
      });
    }
  };
  return (
    <Fragment>
      <div className='absolute w-full px-[30px]'>
        <div className='flex h-[84px] items-center border border-t-0 border-b-gray-200 bg-white  px-6'>
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
      <div className='col-span-full mt-[84px]'>
        {/* 테이블 */}
        <div className='col-span-full mt-[24px] flex min-h-[670px] flex-col rounded border border-grey-300 bg-white'>
          <div className='flex h-[68px] items-center justify-between p-4'>
            <h1 className='text-M/Regular text-grey-800'>
              총 {formatNumber(_state.data.totalCount)}개
            </h1>
            <button className='button-filled-normal-medium-grey-false-false-true'>
              선택 삭제
            </button>
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
            onChange={handleSelect}
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
            _dispatchType={ReportListActionKind.GetReportList}
          />

          <div></div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReportList;
