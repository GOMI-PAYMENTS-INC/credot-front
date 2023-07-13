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
