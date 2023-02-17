import { ReportListActionKind } from '@/containers/report/reportList.reducer';
import {
  TReportListResponse,
  TReportListResponseData,
} from '@/containers/report/report.api';

type TReportListAction = {
  type: ReportListActionKind;
  payload?: any;
};

type TReportListState = {
  page: number; // 페이징용 리포트id
  limit: number; // 페이징용 리스트 사이즈
  data: TReportListResponseData;
};

type TReportItem = {
  id: !Number;
  userId: Number;
  reportUniqueId: String;
  status: String;
  countryCode: String;
  channel: String;
  keyword: String;
  isMain: Boolean;
  sortBy: String;
  itemCount: Number;
  totalItemCount: Number;
  averagePrice: Number;
  createdAt: Date;
  updatedAt: Date;
};

type TReportListParamsType = {
  page: number; // 페이징용 리포트id
  limit: number; // 페이징용 리스트 사이즈
};

type TCreateReportParamsType = {
  country: string; // 국가코드
  reportInvokeId: string;
};

type TCreateReportReponseType = {
  code: string;
  message: string;
  data: any;
};

type TGetMainReportDataType = {
  [key: string]: string | number | Date | TChannelType | TSortedType | null;
};

type TTitle = 'Report' | 'MartketSize' | 'KeywordInfo' | 'RecommendKeyword';
type TReportState = {
  main: TGetMainReportDataType & KeywordInfo & TMarketSize & TRecommnandKeyword;
  relation: TGetRelationReportDataType;
  scrollEvent: { title: TTitle; isOpen: boolean };
};

type TChannelType = 'SHOPEE' | 'NONE';

type TSortedType = 'R' | 'NONE';

type TGetRelationReportDataType = {
  [key: string]: string | number | Date | null;
  id: number;
  text: string;
  searchCount: number;
  competitionProductCount: number;
  competitionRate: number;
  cpcPrice: number;
  cpcRate: number;
  avgPrice: number;
  evaluateStatus: string;
  batchStatus: TBatchStatusType;
  createdAt: Date | null;
};

type TGetMainReport = {
  code: STATUS_CODE;
  message: string;
  data: TGetMainReportDataType;
};
type TGetRelationReport = {
  code: STATUS_CODE;
  message: string;
  data: TGetRelationReportDataType[];
};
