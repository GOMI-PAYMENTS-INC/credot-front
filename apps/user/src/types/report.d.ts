type KeywordInfo = {
  text: string;
  country: CountryType;
  channel: TChannelType;
  sorted: TSortedType;
  createdAt: Date | null;
  currencyUnit: number;
  basePrice: number;
};

type TMarketSize = {
  totalSalesAmount: number;
  avgSalesAmount: number;
  totalSalesCount: number;
};

type TRecommnandKeyword = {
  avgSalesCount: number;
  searchCount: number;
  competitionProductCount: number;
  competitionRate: number;
  cpcPrice: number;
  cpcRate: number;
  avgPrice: number;
  evaluateStatus: string;
};

type TReportItem = {
  id: Number;
  userId: Number;
  reportUniqueId: String;
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
  lastId?: number; // 페이징용 리포트id
  limit?: number; // 페이징용 리스트 사이즈
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

type TReportState = {
  main: TGetMainReportDataType & KeywordInfo & TMarketSize & TRecommnandKeyword;
  relation: TGetRelationReportDataType;
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
