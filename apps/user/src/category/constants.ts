export const CATEGORY_STATE = {
  country: 'SG' as TSearchCountry,
  category: { code: '', value: '' },
  categories: [{ code: '', value: '' }],
};

export const TABLE_COL_ELEMENTS = [
  { unit: '건', key: 'keyword' },
  { unit: '', key: 'salesGrowthRate' },
  { unit: '건', key: 'searchValue' },
  { unit: '개', key: 'itemCount' },
  { unit: '원', key: 'averagePrice' },
  { unit: '원', key: 'cpc' },
  { unit: '', key: 'competitonRate' },
  { unit: '회', key: 'conversionRate' },
  { unit: '%', key: 'cpcRate' },
  { unit: '건', key: 'sales' },
  { unit: '건', key: 'sales7Day' },
  { unit: '건', key: 'sales30Day' },
];

export const CATEGORIES = [
  { text: 'Food & Beverages', value: 'Food & Beverages', subValue: '음식 & 음료수' },
  { text: 'Pets', value: 'Pets', subValue: '애완용품' },
  { text: 'Health', value: 'Health', subValue: '건강' },
  { text: 'Beauty', value: 'Beauty', subValue: '미용' },
];

export const PRODUCT_TABLE_HEADS: TTableColumn[] = [
  { key: 'keyword', title: '키워드', type: 'type1' },
  { key: 'salesGrowthRate', title: '판매량 성장률', type: 'type2' },
  { key: 'searchValue', title: '최근 30일 검색량', type: 'type3' },
  { key: 'itemCount', title: '경쟁 상품 수', type: 'type3' },
  { key: 'averagePrice', title: '평균 판매가', type: 'type3' },
  { key: 'cpc', title: 'CPC 비용', type: 'type3' },
  { key: 'competitonRate', title: '노출 경쟁률', type: '' },
  { key: 'conversionRate', title: '구매 전환빈도', type: '' },
  { key: 'cpcRate', title: 'CPC 비율', type: '' },
  { key: 'sales', title: '전일 판매량', type: '' },
  { key: 'sales7Day', title: '최근 7일 판매량', type: '' },
  { key: 'sales30Day', title: '최근 30일 판매량', type: '' },
];

export const SORTING_STYLE = {
  growth: 'fill-white',
  growthAsc: 'fill-blue-600',
  growthDesc: 'fill-red-600',
  normal: 'fill-grey-400',
  normalSelected: 'fill-grey-800',
};
