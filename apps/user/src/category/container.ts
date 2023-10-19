import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { PRODUCT_TABLE_HEADS, SORTING_STYLE } from '@/category/constants';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { CACHING_KEY } from '@/types/enum.code';
import { getCategoryProducts } from '@/category/api';

import roundNumber from '@/utils/roundNumber';
import convertExchangeRate from '@/utils/convetExchangeRate';
import { formatNumber } from '@/utils/formatNumber';
import { isFalsy } from '@/utils/isFalsy';
import type { SetterOrUpdater } from 'recoil';

const divideNumber = (...args: any) =>
  args
    .map((arg: string | number) => (typeof arg === 'string' ? parseInt(arg) : arg))
    .reduce((pre: number, cur: number) => pre / cur);

export const convertTableList = (table: TTableRowData[]) => {
  if (isFalsy(table)) return [];

  const _table = structuredClone(table) as TTableRowData[];

  const currencyList = useSessionStorage.getItem(
    CACHING_KEY.CURRENCY,
  ) as TCurrencyResponse;
  const countryCode = table[0].countryCode;
  const currency = currencyList.find(
    (data) => (data.currencyCode as TSearchCountry) === countryCode,
  )!;

  return _table.map((data) => {
    const [currencyUnit, basePrice] = [currency.currencyUnit, currency.basePrice].map(
      (item) => parseInt(item),
    );
    const conversionRate = divideNumber(data.sales30Day, data.searchValue);
    const competitonRate = divideNumber(data.itemCount, data.searchValue);
    const cpcRate = divideNumber(data.cpc, data.averagePrice);

    data.conversionRate = formatNumber(conversionRate);
    data.competitonRate = `1 : ${formatNumber(competitonRate)}`;
    data.cpcRate = formatNumber(cpcRate);
    data.salesGrowthRate = roundNumber(data.salesGrowthRate);
    data.gmv30Day = formatNumber(data.gmv30Day);
    data.sales7Day = formatNumber(data.sales7Day);
    data.sales30Day = formatNumber(data.sales30Day);
    data.searchValue = formatNumber(data.searchValue);
    data.sales = formatNumber(data.sales);
    data.itemCount = formatNumber(data.itemCount);
    data.averagePrice = formatNumber(
      roundNumber(
        convertExchangeRate(currencyUnit, data.averagePrice as number, basePrice),
      ),
    );
    data.cpc = formatNumber(
      roundNumber(convertExchangeRate(currencyUnit, data.cpc as number, basePrice)),
    );

    return data;
  });
};

export const updateCategoryPayload = async (props: {
  _state: TCategorySearchType;
  _dispatch: Dispatch<SetStateAction<TCategorySearchType>>;
  key: keyof TCategorySearchType;
  params: TSearchCountry | string;
  calledByEvent?: boolean;
}) => {
  const { _state, _dispatch, params, key, calledByEvent } = props;
  let payload;
  if (key === 'country') {
    const categories = (await useSessionStorage.getItem(
      CACHING_KEY.CATEGORY,
    )) as TCategoryListResponse;
    if (isFalsy(categories)) return '';

    const category = categories.find((category) => category.countryCode === params);

    payload = Object.assign({}, _state, {
      country: category?.countryCode,
      category: category?.category[0],
      categories: category?.category,
    });
  } else {
    const category = _state.categories.find((category) => category.value === params);
    payload = Object.assign({}, _state, { category });
  }

  _dispatch(payload);
};

export const featureConvertor = (type: TColumnType, index: number) => {
  const lastIdx = PRODUCT_TABLE_HEADS.length - 1;

  const THEAD_DEFAULT_CSS = {
    thStyle: 'border-r-[1px] border-grey-300',
    colStyle: 'text-S/Medium px-[14px] py-3 break-keep',
  };

  if (lastIdx === index) {
    THEAD_DEFAULT_CSS.thStyle =
      THEAD_DEFAULT_CSS.thStyle + ' rounded-tr-lg border-r-[0px]';
  }
  if (lastIdx === 0) {
    THEAD_DEFAULT_CSS.thStyle = THEAD_DEFAULT_CSS.thStyle + ' rounded-tl-lg';
  }
  const _style = Object.assign({}, THEAD_DEFAULT_CSS);
  switch (type) {
    case 'type1':
      _style.thStyle = _style.thStyle + ' bg-grey-200';
      _style.colStyle = ' text-grey-900 text-M/bold break-keep px-[100px] py-2.5';
      return _style;
    case 'type2':
      _style.thStyle = _style.thStyle + ' bg-orange-300';
      _style.colStyle = _style.colStyle + ' text-white';
      return _style;
    case 'type3':
      _style.thStyle = _style.thStyle + ' bg-orange-100';

      return _style;
    default:
      _style.thStyle = _style.thStyle + ' bg-grey-200';

      return _style;
  }
};

const pathConvertor = (value: number) => {
  if (value === 0) {
    return '/assets/icons/filled/Zero.svg';
  } else if (value > 0) {
    return '/assets/icons/filled/IncreasedIcon.svg';
  }
  return '/assets/icons/filled/DecreasedIcon.svg';
};
export const sepecificFeature = (
  key: keyof TTableRowData,
  value: ReactNode,
  useScroll: boolean,
) => {
  const featrue = {
    value: value,
    iconPath: '',
    tdStyle: 'border-r-[1px] border-b-[1px] p-[14px]',
    valueStyle: '',
    iconStyle: '',
    divStyle: '',
  };
  switch (key) {
    case 'salesGrowthRate': {
      featrue.value = `${value}%`;
      featrue.divStyle = `flex gap-2.5 items-center`;
      featrue.valueStyle = 'w-20 text-center';
      featrue.iconPath = pathConvertor(value as number);
      featrue.iconStyle = 'self-left';
      return featrue;
    }
    case 'keyword': {
      featrue.divStyle = `flex justify-between items-center`;
      featrue.tdStyle = `${
        featrue.tdStyle
      } py-[6px] pl-[14px] pr-4 sticky left-0 bg-white z-10 ${
        useScroll ? 'shadow-[rgba(0,_0,_0,_0.25)_0px_60px_40px_-7px]' : ''
      }`;
      featrue.valueStyle =
        'text-grey-900 w-[130px] truncate text-S/Medium text-center self-center text-start';
      featrue.iconPath = '/assets/icons/outlined/Linkout.svg';
      featrue.iconStyle = 'cursor-pointer';
      return featrue;
    }
    default: {
      featrue.divStyle = `text-center`;
      return featrue;
    }
  }
};

export const scrollSwitch = (
  scroll: number,
  useScroll: boolean,
  setUseScroll: Dispatch<SetStateAction<boolean>>,
) => {
  if (scroll === 0 && useScroll) {
    setUseScroll(false);
  }
  if (scroll > 0 && useScroll === false) {
    setUseScroll(true);
  }
};

const cachingData = (country: TSearchCountry, code: string, value: TTableRowData[]) => {
  let categoryProducts: TCachingCategoryProducts = {
    [country]: [{ products: value, code }],
  };

  const item = useSessionStorage.getItem(
    CACHING_KEY.CATEGORY_PRODUCTS,
  ) as TCachingCategoryProducts;

  if (categoryProducts[country]) {
    const categories = categoryProducts[country];

    categoryProducts = structuredClone(item) as TCachingCategoryProducts;
    categories.push({ products: value, code });
  }
  categoryProducts = Object.assign({}, item, categoryProducts);
  useSessionStorage.setItem(CACHING_KEY.CATEGORY_PRODUCTS, categoryProducts);
};

const getTableDataFromSession = (country: TSearchCountry, categoryCode: string) => {
  const item = useSessionStorage.getItem(
    CACHING_KEY.CATEGORY_PRODUCTS,
  ) as TCachingCategoryProducts;
  if (item === null) return null;

  return item[country].find((product) => product.code === categoryCode);
};

const isCaching = (country: TSearchCountry, categoryCode: string) => {
  const categories = useSessionStorage.getItem(
    CACHING_KEY.CATEGORY_PRODUCTS,
  ) as TCachingCategoryProducts;

  if (categories === null || categories[country] === undefined) return false;

  const countryProduct = categories[country];

  if (countryProduct.find((product) => product.code === categoryCode)) return true;

  return false;
};

export const _getCategoryProducts = async (
  searchState: TCategorySearchType,
  pagination: TPagination,
  setRowTable: SetterOrUpdater<TCategoryTableData>,
) => {
  const { country, category } = searchState;
  if (category.code === '') return;

  if (isCaching(country, category.code)) {
    const categoryProduct = getTableDataFromSession(country, category.code);
    const table = splitTableByPagination(pagination, categoryProduct?.products!); // 업데이트 로직;

    return setRowTable({ tableData: categoryProduct?.products!, printTable: table });
  }

  const { categoryHotKeywords } = await getCategoryProducts({
    countryCode: country,
    categoryCode: category.code,
  });

  cachingData(country, category.code, categoryHotKeywords);
  const payload = {
    tableData: categoryHotKeywords,
    printTable: splitTableByPagination(pagination, categoryHotKeywords),
  };

  setRowTable(payload);
};

export const splitTableByPagination = (
  pagination: TPagination,
  tableData: TTableRowData[],
  copyArray: boolean = true,
) => {
  const { bundle, page } = pagination;
  const _tableData = copyArray
    ? (structuredClone(tableData) as TTableRowData[])
    : tableData;

  const from = (page - 1) * bundle;
  const to = bundle;

  const table = _tableData.splice(from, to);

  return table;
};

export const updateTable = (
  key: keyof TPagination,
  value: number,
  pagination: TPagination,
  setPagination: SetterOrUpdater<TPagination>,
  tableData: TCategoryTableData,
  setTableData: SetterOrUpdater<TCategoryTableData>,
) => {
  const _pagination = Object.assign({}, pagination, { [key]: value });
  setPagination(_pagination);

  const table = splitTableByPagination(_pagination, tableData.tableData);

  const updatedTable = structuredClone(tableData) as TCategoryTableData;
  updatedTable.printTable = table;

  return setTableData(updatedTable);
};

export const _setSearchState = (
  setSearchState: Dispatch<SetStateAction<TCategorySearchType>>,
) => {
  const categories = useSessionStorage.getItem(
    CACHING_KEY.CATEGORY,
  ) as TCategoryListResponse;
  const initialCategory = categories.find((category) => category.countryCode === 'SG')!;

  const initialCategoryState = {
    country: initialCategory.countryCode,
    category: initialCategory.category[0],
    categories: initialCategory.category,
  };
  return setSearchState(initialCategoryState);
};

export const getBaseDate = (searchState: TCategorySearchType) => {
  const categories = useSessionStorage.getItem(
    CACHING_KEY.CATEGORY,
  ) as TCategoryListResponse;
  const {
    country,
    category: { code },
  } = searchState;
  if (isFalsy(categories)) return '';

  return (
    categories
      .find((category) => category.countryCode === country)
      ?.category.find((item) => item.code === code)?.baseDate || ''
  ).replaceAll('-', '.');
};

export const getSortingIconStyle = (
  config: TSortingConfig,
  key: keyof TTableRowData,
): { down: string; up: string } => {
  const { sortingItem, type } = config;
  const { growth, normal, normalSelected, growthAsc, growthDesc } = SORTING_STYLE;
  if (key === 'salesGrowthRate') {
    if (sortingItem === key)
      return type === 'ASC'
        ? { down: growth, up: growthAsc }
        : { down: growthDesc, up: growth };
    return { down: growth, up: growth };
  }

  if (key === config.sortingItem) {
    return type === 'ASC'
      ? { down: normal, up: normalSelected }
      : { down: normalSelected, up: normal };
  }

  return { down: normal, up: normal };
};

export const updateStatesBySorting = (
  config: TSortingConfig,
  key: keyof TTableRowData,
  setConfig: SetterOrUpdater<TSortingConfig>,
  tableList: TCategoryTableData,
  setTableList: SetterOrUpdater<TCategoryTableData>,
  pagination: TPagination,
) => {
  if (key !== 'salesGrowthRate' && key.includes('Rate')) return 0;

  const _config = Object.assign({}, config, {
    type: key === config.sortingItem && config.type === 'ASC' ? 'DESC' : 'ASC',
  });
  updateSortingConfig(_config, key, setConfig);
  tableListUpdateBySorting(_config, key, tableList, setTableList, pagination);
};

export const updateSortingConfig = (
  config: TSortingConfig,
  key: keyof TTableRowData,
  setConfig: SetterOrUpdater<TSortingConfig>,
) => {
  const { sortingItem, type } = config;

  if (key === sortingItem) {
    setConfig(config);
  } else {
    setConfig({ sortingItem: key, type: 'ASC' });
  }
};

export const tableListUpdateBySorting = (
  config: TSortingConfig,
  key: keyof TTableRowData,
  tableList: TCategoryTableData,
  setTableList: SetterOrUpdater<TCategoryTableData>,
  pagination: TPagination,
) => {
  const _rowTable = structuredClone(tableList) as TCategoryTableData;
  const { type } = config;

  _rowTable.tableData.sort((cur, pre) => {
    const [_cur, _pre] = [cur[key], pre[key]] as number[];

    if (type === 'ASC') return _cur - _pre > 0 ? 1 : -1;

    return _cur - _pre < 0 ? 1 : -1;
  });

  const table = splitTableByPagination(pagination, _rowTable.tableData);
  setTableList({ tableData: _rowTable.tableData, printTable: table });
};
