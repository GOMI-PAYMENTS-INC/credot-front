type TCategorySearchType = {
  country: TSearchCountry;
  category: { text: string; value: string; subValue: string };
};
type TColumnType = 'type1' | 'type2' | 'type3' | '';
type TTableColumn = { title: string; type: TColumnType };

type TTableElements = { thead: TTableColumn[]; tbody: TRespone[] };

type TRespone = {
  id: number;
  baseDate: string;
  countryCode: TSearchCountry;
  categoryCode1: number;
  categoryCode2: number;
  categoryCode3: number;
  keyword: string;
  itemCount: number;
  sales: number;
  sales7Day: number;
  sales30Day: number;
  gmv30Day: number;
  searchValue: number;
  cpc: number;
  salesGrowthRate: number;
  averagePrice: number;
  createdAt: string;
  updatedAt: string;
};
