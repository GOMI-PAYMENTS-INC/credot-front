import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { PRODUCT_TABLE_HEADS } from '@/category/constants';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { CACHING_KEY } from '@/types/enum.code';
import { getCategoryProducts } from '@/category/api';

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
    const categories = (await useSessionStorage.getItem(CACHING_KEY.CATEGORY)) as {
      countryCode: TSearchCountry;
      category: {
        code: string;
        value: string;
      }[];
    }[];

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
  setRowTable: Dispatch<SetStateAction<TCategoryTableData>>,
) => {
  const { country, category } = searchState;
  if (category.code === '') return;

  if (isCaching(country, category.code)) {
    const categoryProduct = getTableDataFromSession(country, category.code);
    const table = splitTableByPagination(pagination, categoryProduct?.products!); // 업데이트 로직;
    console.log(table, 'table');
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
) => {
  const { bundle, page } = pagination;
  const _tableData = structuredClone(tableData) as TTableRowData[];

  const from = (page - 1) * bundle;
  const to = bundle;

  const table = _tableData.splice(from, to);

  return table;
};

export const updateTable = (
  key: keyof TPagination,
  value: number,
  pagination: TPagination,
  setPagination: Dispatch<SetStateAction<TPagination>>,
  tableData: TCategoryTableData,
  setTableData: Dispatch<SetStateAction<TCategoryTableData>>,
) => {
  const _pagination = Object.assign({}, pagination, { [key]: value });
  setPagination(_pagination);

  const table = splitTableByPagination(_pagination, tableData.tableData);
  console.log(table, 'table');
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
