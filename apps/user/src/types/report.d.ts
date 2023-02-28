type TReportListResponseData = {
  reports: TReportItem[];
  totalCount: number;
};

type TReportListResponse = {
  code: STATUS_CODE;
  message: string;
  data: TReportListResponseData;
};

type TReportListAction = {
  type: 'GET_REPORT_LIST' | 'DELETE_REPORT';
  payload?: any;
};

type TReportListState = {
  page: number; // 페이징용 리포트id
  limit: number; // 페이징용 리스트 사이즈
  data: TReportListResponseData;
  isDeleteConfirmModalOpen: boolean;
};

type TReportListCheckedState = {
  checkedItems: number[];
};

type TDeleteReportListResponse = {
  code: STATUS_CODE;
  message: string;
  data: any;
};

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
  avgSalesCount: number;
  basePrice: number;
};

type TRecommnandKeyword = {
  searchCount: number;
  competitionProductCount: number;
  competitionRate: number;
  cpcPrice: number;
  cpcRate: number;
  avgPrice: number;
  basePrice: number;
  evaluateStatus: string;
};

type TReportItem = {
  id: !number;
  userId: number;
  reportUniqueId: string;
  status: string;
  countryCode: string;
  channel: string;
  keyword: string;
  isMain: boolean;
  sortBy: string;
  itemCount: number;
  totalItemCount: number;
  averagePrice: number;
  createdAt: Date;
  updatedAt: Date;
};

type TReportListParamsType = {
  page: number; // 페이징용 리포트id
  limit: number; // 페이징용 리스트 사이즈
};

type TDeleteReportListParamsType = {
  ids: number[];
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
  main: (TGetMainReportDataType & KeywordInfo & TMarketSize & TRecommnandKeyword) | null;
  relation: TGetRelationReportDataType[];
  salePrice: TSalePriceData;
  scrollEvent: { title: TTitle; isOpen: boolean; current: TTitle };
  toggleEvent: { id: number; isOpen: boolean }[];
  spinnerEvent: boolean;
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

type TSalePriceResponse = {
  code: STATUS_CODE;
  message: string;
  data: TSalePriceData;
};

type TSalePriceData = {
  [key: string]: string | number | Date | null | Array;
  id: number;
  text: string;
  country: CountryType;
  channel: TChannelType;
  gradeItems: TSalePriceItems[][];
  priceAnalysisInfo: TPriceAnalysisInfo;
  itemGradeIndices: number[];
  totalItemCount: number;
  items: TSalePriceItems[];
} | null;

type TPriceAnalysisInfo = {
  sortBy: SORT_BY;
  min: number;
  max: number;
  avg: number;
  levelCount: number;
  levelBound: number;
  basePrice: number;
};

type TSalePriceItems = {
  id: number;
  insightEeportId: number;
  reportUniqueId: string;
  rank: number;
  itemName: string | null;
  itemUrl: string | null;
  itemStockLocation: string | null;
  storeName: string;
  storeItemCount: number;
  storeRatingStar: number;
  itemPriceMaxBeforeDiscount: number;
  itemPriceMinBeforeDiscount: number;
  itemPriceMin: number;
  itemPriceMax: number;
  itemPriceAvg: number;
  itemHasLowestPriceGuarantee: boolean;
  itemHistoricalSold: number;
  item30daysSold: number;
  itemSales: number;
  itemdescription: string | null;
  itemBrand: string | null;
};
