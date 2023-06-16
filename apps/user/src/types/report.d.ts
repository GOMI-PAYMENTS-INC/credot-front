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
  channel: TChannel;
  sorted: TSortBy;
  createdAt: Date | null;
  currencyUnit: number;
  basePrice: number;
  itemCount: number;
};

type TMarketSize = {
  totalSalesAmount: number;
  avgSalesAmount: number;
  totalSalesCount: number;
  avgSalesCount: number;
  basePrice: number;
  currencyUnit: number;
  country: CountryType;
  createdAt: Date | null;
  trend: TGoogleTrendDataType;
  itemCount: number;
};

type TGoogleTrendDataType = {
  id: string;
  trendDate: Date;
  interest: number;
}[];

type TRecommendKeyword = {
  searchCount: number;
  competitionProductCount: number;
  competitionRate: number;
  cpcPrice: number;
  cpcRate: number;
  avgPrice: number;
  currencyUnit: number;
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
  sortBy: TSortBy;
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

type TCreateReportParams = {
  country: CountryType;
  reportInvokeId: string;
  sortBy: TSortBy;
  jobId: string;
};

type TGetReportExistedParamsType = {
  country: CountryType;
  text: string;
  sortBy: TSortBy;
};
type TCreateReportResponseType = {
  code: string;
  message: string;
  data: any;
};

type TGetMainReportDataType = {
  [key: string]: string | number | Date | TChannel | TSortBy | null;
};

type TTitle = 'Report' | 'MarketSize' | 'KeywordInfo' | 'RecommendKeyword';

type GRADE_TYPE = 'high' | 'medium' | 'low';

type TReportState = {
  main: (TGetMainReportDataType & TKeywordInfo & TMarketSize & TRecommendKeyword) | null;
  relation: TGetRelationReportDataType[];
  salePrice: {
    data: TSalePriceData | null;
    focus: GRADE_TYPE;
    list: TSalePriceItems[] | [];
  };
  oversea: TOverseaProductData | null;
  brand: {
    focus: number;
    data: TBrandAnalysis | null;
  };
  scrollEvent: { title: TTitle; isOpen: boolean; current: TTitle };
  toggleEvent: { id: number; isOpen: boolean }[];
  spinnerEvent: boolean;
  shareToken: string | null;
};

type TAmplitudeDetailData = {
  param: string;
  keyword: string;
};

type TChannel = 'SHOPEE' | 'NONE';

type TSortBy = 'R' | 'S' | 'NONE';

type TGetRelationReportDataType = {
  [key: string]: any;
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
type TPostReportShareTokenParamsType = {
  id: string;
};
type TPostReportShareTokenResponse = {
  code: STATUS_CODE;
  message: string;
  data: string | null;
};
type TGetMainReportResponse = {
  code: STATUS_CODE;
  message: string;
  data: TGetMainReportDataType;
};
type TGetRelationReportResponse = {
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
  channel: TChannel;
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

type scrollEventState = {
  scrollY: number;
  title: string;
  isOpen: boolean;
  current: string;
};

type TBrandAnalysisProduct = {
  id: number;
  itemName: string;
  itemUrl: string;
  itemImage: string;
  itemPriceMin: number;
  itemPriceMax: number;
  item30daySales: number;
  item30daysSold: number;
  rank: number;
};

type TBrandAnalysisBrand = {
  rank: number;
  name: string;
  productCount: number;
  totalSalesAmount: number;
  totalSalesCount: number;
  avgSalesAmount: number;
  avgSalesCount: number;
  avgPrice: number;
  products: TBrandAnalysisProduct[];
};

type TBrandAnalysis = {
  text: string;
  country: CountryType;
  channel: TChannel;
  sorted: TSortBy;
  currencyUnit: number;
  basePrice: number;
  brands: TBrandAnalysisBrand[];
};

type TBrandAnalysisResponse = {
  code: STATUS_CODE;
  message: string;
  data: TBrandAnalysis;
};
