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

type TReportState = {
  main: TGetMainReportDataType;
  relation: TGetRelationReportDataType;
};

type TChannelType = 'SHOPEE' | 'NONE';

type TSortedType = 'R' | 'NONE';

type TGetMainReportDataType = {
  [key: string]: string | number | Date | TChannelType | TSortedType | null;
  text: string;
  country: CountryType;
  channel: TChannelType;
  sorted: TSortedType;
  currencyUnit: number;
  basePrice: number;
  totalSales_amount: number;
  avgSalesAmount: number;
  totalSalesCount: number;
  avgSalesCount: number;
  searchCount: number;
  competitionProductCount: number;
  competitionRate: number;
  cpcPrice: number;
  cpcRate: number;
  avgPrice: number;
  evaluateStatus: string;
  createdAt: Date | null;
};

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
