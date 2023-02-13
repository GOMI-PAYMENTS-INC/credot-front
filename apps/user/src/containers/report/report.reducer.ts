import { CountryType } from '@/generated/graphql';
import { TBatchStatusType } from '@/containers/report/report.api';

const reportInitialState: TReportState = {
  main: {
    text: '',
    country: CountryType.Vn,
    channel: 'SHOPEE',
    sorted: 'R',
    currencyUnit: 0,
    basePrice: 0,
    totalSales_amount: 0,
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
};

export enum REPORT_ACTION {
  INITIALIZE_DATA = 'INITIALIZE_DATA',
}
export type TReportAction = {
  type: REPORT_ACTION;
  payload?: any; // FIXME: any 지우기
};

const reportReducer = (_state: TReportState, action: TReportAction) => {
  const state = structuredClone(_state);
  console.log(action.payload, 'payload');
  switch (action.type) {
    case REPORT_ACTION.INITIALIZE_DATA:
      const { type, data } = action.payload;
      if (type === 'main') {
        Object.keys(state.main).map((key) => {
          state.main[key] = data[key];
        });
      }
      if (type === 'relation') {
        Object.keys(state.relation).map((key) => {
          state.relation[key] = data[key];
        });
      }
      return state;

    default:
      return state;
  }
};

export { reportInitialState, reportReducer };
