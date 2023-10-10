import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { CACHING_KEY } from '@/types/enum.code';
import { PRODUCT_TABLE_ELEMENTS, TABLE_COL_ELEMENTS } from '@/category/constants';
import { switchHotKeyword } from '@/search/container';

export const updateCategoryPayload = (props: {
  _state: TCategorySearchType;
  _dispatch: Dispatch<SetStateAction<TCategorySearchType>>;
  key: keyof TCategorySearchType;
  params: TSearchCountry | string;
  calledByEvent?: boolean;
}) => {
  const { _state, _dispatch, params, key, calledByEvent } = props;
  const preKeyword = useSessionStorage.getItem(CACHING_KEY.CATEGORY);
  const updatedState = Object.assign({}, _state, { [key]: params });

  // _dispatch(updatedState);
};

export const featureConvertor = (type: TColumnType, index: number) => {
  const lastIdx = PRODUCT_TABLE_ELEMENTS.thead.length - 1;

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
  key: keyof TRespone,
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
      featrue.tdStyle = `${featrue.tdStyle} sticky left-0 bg-white z-10 ${
        useScroll ? 'shadow-[rgba(0,_0,_0,_0.25)_0px_60px_40px_-7px]' : ''
      }`;
      featrue.valueStyle = 'text-orange-400 cursor-pointer w-[180px] truncate';
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
