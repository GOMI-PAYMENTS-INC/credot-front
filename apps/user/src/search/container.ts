import { SEARCH_ACTION, searchInitialState } from '@/search/reducer';
import type { Dispatch, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { CACHING_KEY } from '@/types/enum.code';
import { UseFormSetValue } from 'react-hook-form';
import { SEARCH_STATE_INIT_VALUE } from '@/search/newSearch/constants';
import { toast } from 'react-toastify';
import { useSessionStorage } from '@/utils/useSessionStorage';

import {
  _amplitudeKeywordReportRequested,
  _amplitudeKeywordSearched,
} from '@/amplitude/amplitude.service';
import { CountryType } from '@/generated/graphql';

export const queryKeywordByClick = (
  country: keyof typeof CountryType,
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
  setValue: UseFormSetValue<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>,
) => {
  if (keyword) _dispatch({ type: SEARCH_ACTION.INITIALIZE_IMAGES, payload: keyword });
  setValue('keyword', keyword);
  _dispatch({ type: SEARCH_ACTION.GET_KEYWORD, payload: keyword });
  _dispatch({
    type: SEARCH_ACTION.SEARCH_KEYWORD,
    payload: { keyword: keyword, country: country },
  });
};

export const queryKeyword = (
  country: CountryType,
  sortBy: TSortBy,
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  const _switch = isFalsy(keyword) === false;

  if (_switch === false) {
    toast.error('리포트를 생성할 키워드를 입력해주세요.');
    return;
  }
  const preKeyword = useSessionStorage.getItem(CACHING_KEY.STORED_KEYWORD);

  if (
    isFalsy(preKeyword) === false &&
    keyword === preKeyword.keyword &&
    country === preKeyword.country
  ) {
    toast.success(`${keyword}에 대한 키워드 정보에요`);
  }
  _dispatch({ type: SEARCH_ACTION.GET_KEYWORD, payload: keyword.toLowerCase() });
  _dispatch({ type: SEARCH_ACTION.INITIALIZE_IMAGES, payload: keyword });
  _dispatch({ type: SEARCH_ACTION.SEARCH_MODE, payload: _switch });
  _dispatch({
    type: SEARCH_ACTION.SEARCH_KEYWORD,
    payload: { country: country },
  });

  _amplitudeKeywordSearched(country, sortBy, keyword);
};

export const initializeState = (
  cachingData: TSearchState,
  _dispatch: Dispatch<TSearchActionType>,
  setValue: UseFormSetValue<{
    country: CountryType;
    sortBy: TSortBy;
    keyword: string;
  }>,
) => {
  setValue('country', cachingData.country);
  setValue('keyword', cachingData.text);

  //sortBy가 세션에 없던 이전 버전 대응
  if (isFalsy(cachingData.sortBy)) {
    cachingData.sortBy = searchInitialState.sortBy;
  }
  setValue('sortBy', cachingData.sortBy);

  _dispatch({ type: SEARCH_ACTION.INITIALIZE_STATE, payload: cachingData });
};

export const isSearched = (_dispatch: Dispatch<TSearchActionType>, status: boolean) => {
  _dispatch({ type: SEARCH_ACTION.SEARCH_MODE, payload: status });
};

export const _getProductImages = (
  data: TGetProductImageResponse,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  _dispatch({
    type: SEARCH_ACTION.GET_PRODUCT_IMAGES,
    payload: data,
  });
};

export const initializeImages = (
  _dispatch: Dispatch<TSearchActionType>,
  keyword: string,
) => _dispatch({ type: SEARCH_ACTION.INITIALIZE_IMAGES, payload: keyword });

export const convertSearchPlaceholder = (country: CountryType) => {
  switch (country) {
    case CountryType.SG:
      return 'shampoo';
    case CountryType.MY:
      return 'phone charger';
    case CountryType.TW:
      return '馬克杯收納';
    case CountryType.VN:
      return 'gấu bông';
    case CountryType.TH:
      return 'มะม่วงอบแห้ง';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};

export const updateSearchPayload = (props: {
  _state: TSearchProps;
  _dispatch: Dispatch<SetStateAction<TSearchProps>>;
  key: keyof TSearchProps;
  params: TSearchCountry | TSortBy | string | TProductImageType | null;
}) => {
  const { _state, _dispatch, params, key } = props;

  const updatedState = Object.assign({}, _state, { [key]: params });
  if (key === 'keyword') {
    useSessionStorage.setItem(CACHING_KEY.STORED_KEYWORD, updatedState);
  }
  _dispatch(updatedState);
};

export const initailizeSearchProps = (
  _dispatch: Dispatch<SetStateAction<TSearchProps>>,
) => _dispatch(SEARCH_STATE_INIT_VALUE);
