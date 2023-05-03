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
  type: REPORT_LIST_ACTION;
  payload?: any;
};

type TReportListState = {
  page: number; // 페이징용 리포트id
  limit: number; // 페이징용 리스트 사이즈
  data: TReportListResponseData;
  isDeleteConfirmModalOpen: boolean;
  spinnerEvent: boolean;
  //전체 선택 체크 여부
  isCheckedAll: boolean;
  //체크한 item 배열
  checkedItems: TReportItem[];
};

type TGetReportList = {
  _dispatch: Dispatch<TReportListAction>;
  _state: TReportListState;
};

type TDeleteReportListResponse = {
  code: STATUS_CODE;
  message: string;
  data: any;
};

type TKeywordInfo = {
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
  trend: TGoogleTrendDataType;
};

type TGoogleTrendDataType = {
  id: string;
  trendDate: Date;
  interest: number;
}[];

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
  countryCode: CountryType;
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
  country: CountryType;
  reportInvokeId: string;
};
type TGetReportExistedParamsType = {
  country: CountryType;
  text: string;
};
type TCreateReportResponseType = {
  code: string;
  message: string;
  data: any;
};

type TGetMainReportDataType = {
  [key: string]: string | number | Date | TChannelType | TSortedType | null;
};

type TTitle = 'Report' | 'MartketSize' | 'KeywordInfo' | 'RecommendKeyword';

type GRADE_TYPE = 'high' | 'medium' | 'low';

type TReportState = {
  main: (TGetMainReportDataType & TKeywordInfo & TMarketSize & TRecommnandKeyword) | null;
  relation: TGetRelationReportDataType[];
  salePrice: {
    data: TSalePriceData | null;
    focus: GRADE_TYPE;
    list: TSalePriceItems[] | [];
  };
  oversea: TOverseaProductData | null;
  scrollEvent: { title: TTitle; isOpen: boolean; current: TTitle };
  toggleEvent: { id: number; isOpen: boolean }[];
  spinnerEvent: boolean;
};

type TAmplitudeDetailData = {
  reportId: string;
  keyword: string;
};

type TChannelType = 'SHOPEE' | 'NONE';

type TCountryType = 'KR' | 'TH' | 'US' | 'VN';

type TCollectSortType = 'R' | 'NONE';

type TSortedType = 'PRICE_MIN' | 'PRICE_MAX' | 'PRICE_AVERAGE';

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
  itemCount: number;
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
  itemImage: string;
  rank: number;
  itemName: string;
  itemUrl: string;
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
  item30daySales: number;
  itemSales: number;
  itemdescription: string | null;
  itemBrand: string | null;
};

type TScrollEvent = {
  scrollY: number;
  title: string;
  isOpen: boolean;
  current: string;
};

type TOverseaProductResponse = {
  code: STATUS_CODE;
  message: string;
  data: TOverseaProductData[];
};

type TOverseaProductData = {
  id: number;
  text: string;
  country: CountryType;
  channel: 'SHOPEE';
  itemOverseaCount: number;
  totalItemCount: number;
  overseaCountryCount: { itemShopCountry: string; count: number }[];
  overseaItems: TOverSeaItems[];
};

type TOverSeaItems = {
  id: number;
  insightReportId: number;
  reportUniqueId: string;
  rank: number;
  itemName: string;
  itemUrl: string;
  itemImage: string;
  itemStockLocation: string;
  storeName: string;
  itemShopCountry: string;
  storeItemCount: number;
  itemPriceMin: number;
  itemPriceMax: number;
  itemPriceAvg: number;
  itemHasLowestPriceGuarantee: true;
  itemHistoricalSold: number;
  item30daysSold: number;
  itemSales: number;
  item30daySales: number;
  itemBrand: string;
};
