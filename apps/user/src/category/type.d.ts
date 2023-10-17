type TCategorySearchType = {
  country: TSearchCountry;
  category: TCategoryType;
  categories: TCategoryType[];
};
type TCategoryType = { value: string; code: string };
type TColumnType = 'type1' | 'type2' | 'type3' | '';
type TTableColumn = { title: string; type: TColumnType };

type TTableElements = { thead: TTableColumn[]; tbody: TTableRowData[] };

type TPagination = { bundle: number; page: number };

type TTableRowData = {
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

type TCategoryTableList = {
  totalCount: number;
  categoryHotKeywords: TTableRowData[];
};
