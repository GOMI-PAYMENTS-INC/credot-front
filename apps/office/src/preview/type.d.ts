type TGoogleTrendDataType = {
  id: number;
  trendDate: string;
  interest: number;
}[];

type TCategoryAnalysisCategories = {
  id: string;
  productCount: number;
  infos: {
    depth: number;
    name: string;
  }[];
};

type TCategoryAnalysis = {
  text: string;
  country: string;
  channel: string;
  sorted: string;
  categories: TCategoryAnalysisCategories[];
};

type TCategoryChart = {
  count: number;
  category: string;
  background: string;
};

type TBrandAnalysisProduct = {
  id: number;
  itemName: string;
  itemUrl: string;
  itemImage: string;
  itemPriceMin: number;
  itemPriceMax: number;
  item30daysSales: number;
  item30daysSold: number;
  rank: number;
};

type TSalePriceItems = {
  id: number;
  insightReportId: number;
  reportUniqueId: string;
  itemImage: string;
  rank: number;
  itemName: string;
  itemUrl: string;
  itemStockLocation: string | null;
  storeName: string | null;
  itemShopLocation: null | string;
  storeItemCount: number | null;
  storeRatingStar: number | null;
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
  itemDescription: string | null;
  itemBrand: string | null;
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

type TScrollEvent = {
  scrollY: number;
  isOpen: boolean;
  current: string;
};
