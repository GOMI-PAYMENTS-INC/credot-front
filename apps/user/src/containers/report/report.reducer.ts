import { CountryType } from '@/generated/graphql';
import { TBatchStatusType } from '@/containers/report/report.api';

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
  relation: {
    id: 0,
    text: '',
    searchCount: 0,
    competitionProductCount: 0,
    competitionRate: 0,
    cpcPrice: 0,
    cpcRate: 0,
    avgPrice: 0,
    evaluateStatus: 'AAA',
    batchStatus: TBatchStatusType.NONE,
    createdAt: null,
  },
  scrollEvent: { title: 'Report', isOpen: false, current: 'Report' },
};

export enum REPORT_ACTION {
  INITIALIZE_DATA = 'INITIALIZE_DATA',
  SCROLL_EVENT = 'SCROLL_EVENT',
  TOGGLE_CONTROL = 'TOGGLE_CONTROL',
  UPDATE_CURRENT = 'UPDATE_CURRENT',
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
        return state;
      }
      if (type === 'relation') {
        Object.keys(state.relation).map((key) => {
          state.relation[key] = data[key];
          return state;
        });
      }
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
    default:
      return state;
  }
};

export { reportInitialState, reportReducer };
