import { Dispatch } from 'react';
import {
  TReportItem,
  TReportListAction,
  TReportListParamsType,
  TReportListState,
} from '@/types/report';
import { getReportList } from '@/containers/report/report.api';
import { ActionKind } from '@/containers/search';
import { ReportListActionKind } from '@/containers/report/reportList.reducer';
import { STATUS_CODE } from '@/types/statusCode';

type TGetReportList = {
  _dispatch: Dispatch<TReportListAction>;
  _state: TReportListState;
};

export const setReportList = async ({ _state, _dispatch }: TGetReportList) => {
  console.log('2. ===== report.ts > setReportList');
  console.log('2. _state', _state);
  console.log('2. _dispatch', _dispatch);
  console.log('2. ===== report.ts > setReportList');

  try {
    const res = await getReportList({
      page: _state.page,
      limit: _state.limit,
    });
    const reportInfo = res?.data;
    //FIXME: 요청과 재요청 로직 줄일 수 있는 방법 생각하기
    if (reportInfo?.code === STATUS_CODE.SUCCESS) {
      _state.data = reportInfo.data;
      console.log('성공적으루다가 가져왔서~');
      _dispatch({ type: ReportListActionKind.GetReportList, payload: _state });
    }

    return reportInfo;
  } catch (error) {
    console.error(error);
  }
};
