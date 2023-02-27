import { CountryType } from '@/generated/graphql';
import { SORT_BY } from '@/types/enum.code';

const reportInitialState: TReportState = {
  main: {
    text: 'Loading...',
    country: CountryType.Vn,
    channel: 'SHOPEE',
    sorted: 'R',
    currencyUnit: 0,
    basePrice: 0,
    totalSalesAmount: 0,
    avgSalesAmount: 0,
    totalSalesCount: 0,
    avgSalesCount: 0,
    searchCount: 0,
    competitionProductCount: 0,
    competitionRate: 0,
    cpcPrice: 0,
    cpcRate: 0,
    avgPrice: 0,
    evaluateStatus: 'AAA',
    createdAt: null,
  },
  relation: [],
  salePrice: null,
  scrollEvent: { title: 'Report', isOpen: false, current: 'Report' },
  toggleEvent: [],
  spinnerEvent: false,
};

export enum REPORT_ACTION {
  INITIALIZE_DATA = 'INITIALIZE_DATA',
  SCROLL_EVENT = 'SCROLL_EVENT',
  TOGGLE_CONTROL = 'TOGGLE_CONTROL',
  UPDATE_CURRENT = 'UPDATE_CURRENT',
  RECOMMENDATION_TOGGLE_EVENT = 'RECOMMENDATION_TOGGLE_EVENT',
  INITIALIZE_SCROLL_EVENT = 'INITIALIZE_SCROLL_EVENT',
  SPINNER_EVENT = 'SPINNER_EVENT',
}

export type TReportAction = {
  type: REPORT_ACTION;
  payload?: any; // FIXME: any 지우기
};

const reportReducer = (_state: TReportState, action: TReportAction) => {
  const state = structuredClone(_state);

  switch (action.type) {
    case REPORT_ACTION.INITIALIZE_DATA: {
      const { type, data } = action.payload;
      if (type === 'main') {
        Object.keys(state.main).map((key) => {
          state.main[key] = data[key];
        });
      }
      if (type === 'relation') {
        state.relation = data;
        const [first] = data;
        if (first) {
          state.toggleEvent = state.toggleEvent.concat(first);
        }
      }
      if (type === 'price') {
        state.salePrice = data;
      }
      return state;
    }
    case REPORT_ACTION.SCROLL_EVENT: {
      state.scrollEvent.title = action.payload;
      return state;
    }
    case REPORT_ACTION.UPDATE_CURRENT: {
      state.scrollEvent.current = action.payload;
      return state;
    }
    case REPORT_ACTION.TOGGLE_CONTROL: {
      state.scrollEvent.isOpen = !state.scrollEvent.isOpen;
      return state;
    }
    case REPORT_ACTION.RECOMMENDATION_TOGGLE_EVENT: {
      const { id } = action.payload;
      const status = state.toggleEvent.find((status) => status.id === id) || false;

      if (status === false) {
        state.toggleEvent = state.toggleEvent.concat({ id: id, isOpen: true });
      } else {
        state.toggleEvent = state.toggleEvent.filter((key) => key.id !== id);
      }
      return state;
    }
    case REPORT_ACTION.INITIALIZE_SCROLL_EVENT: {
      state.scrollEvent = Object.assign({}, reportInitialState.scrollEvent, {
        isOpen: state.scrollEvent.isOpen,
      });
      return state;
    }
    case REPORT_ACTION.SPINNER_EVENT: {
      state.spinnerEvent = !state.spinnerEvent;
    }
    default:
      return state;
  }
};

export { reportInitialState, reportReducer };

export enum ReportListAction {
  GetReportList = 'GET_REPORT_LIST',
  DeleteReport = 'DELETE_REPORT',
}

const reportListInitialState: TReportListState = {
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
    case ReportListAction.GetReportList:
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.data = action.payload.data;
      return state;

    case ReportListAction.DeleteReport:
      // state.createdAt = action.payload;
      return state;

    default:
      return state;
  }
};

export { reportListReducer, reportListInitialState };
