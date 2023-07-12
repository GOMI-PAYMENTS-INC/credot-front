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
