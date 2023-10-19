type TCategorySearchType = {
  country: TSearchCountry;
  category: TCategoryType;
  categories: TCategoryType[];
};
type TCategoryType = { value: string; code: string };
type TColumnType = 'type1' | 'type2' | 'type3' | '';
type TTableColumn = { title: string; type: TColumnType; key: keyof TTableRowData };

type TTableElements = { thead: TTableColumn[]; tbody: TTableRowData[] };

type TPagination = { bundle: number; page: number };

type TTableRowData = {
  id: number | string;
  baseDate: string;
  countryCode: TSearchCountry;
  categoryCode1: number | string;
  categoryCode2: number | string;
  categoryCode3: number | string;
  keyword: string;
  itemCount: number | string;
  sales: number | string;
  sales7Day: number | string;
  sales30Day: number | string;
  gmv30Day: number | string;
  searchValue: number | string;
  cpc: number | string;
  salesGrowthRate: number | string;
  averagePrice: number | string;
  createdAt: string;
  updatedAt: string;
  competitonRate?: string;
  conversionRate?: string;
  cpcRate?: string;
};

type TCategoryTableList = {
  totalCount: number;
  categoryHotKeywords: TTableRowData[];
};

type TCachingCategoryProducts = {
  [country: string]: {
    products: TTableRowData[];
    code: string;
  }[];
};

type TCategoryTableData = {
  tableData: TTableRowData[];
  printTable: TTableRowData[];
};

type TCurrencyCode = 'TWD' | 'THB' | 'VND' | 'SGD' | 'MYR';

type TSortingType = 'DESC' | 'ASC' | '';

type TSortingConfig = {
  sortingItem: keyof TTableRowData;
  type: TSortingType;
};
