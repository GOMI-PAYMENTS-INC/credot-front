export enum ReportListActionKind {
  //최초 리스트 가져오기
  GetReportList = 'GET_REPORT_LIST',
  //리포트 삭제
  DeleteReport = 'DELETE_REPORT',
}

const initialState: TReportListState = {
  page: 1,
  limit: 10,
  data: {
    reports: [],
    totalCount: 0,
  },
};

const reportListReducer = (_state: TReportListState, action: TReportListAction) => {
  const state = structuredClone(_state);
  switch (action.type) {
    //리포트 목록 초기 출력
    case ReportListActionKind.GetReportList:
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.data = action.payload.data;
      return state;

    case ReportListActionKind.DeleteReport:
      // state.createdAt = action.payload;
      return state;

    default:
      return state;
  }
};

export { reportListReducer, initialState };
