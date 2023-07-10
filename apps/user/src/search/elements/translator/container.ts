import { RECOMMENDER_ACTION } from '@/search/reducer';
import { Dispatch, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { UseFormSetValue } from 'react-hook-form';

import { getTranslationOfKeyword } from '@/search/api';
import { CACHING_KEY, LANGUAGE_TYPE } from '@/types/enum.code';
import { SEARCH_KEYWORD_STATUS } from '@/search/constants';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { _amplitudeKeywordTranslated } from '@/amplitude/amplitude.service';

export const switchTranslationTab = (
  _dispatch: Dispatch<TSearchActionType>,
  tabState: boolean,
) => _dispatch({ type: RECOMMENDER_ACTION.USE_TRANSLATION, payload: tabState });

export const searchKeyword = async (
  country: LANGUAGE_TYPE,
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
  _setState?: Dispatch<SetStateAction<boolean>> | null,
  setValue?: UseFormSetValue<{ country: LANGUAGE_TYPE; searchWord: string }>,
) => {
  try {
    let _keyword = keyword || '수분 크림';
    if (isFalsy(keyword) && setValue) {
      setValue('country', country);
      setValue('searchWord', _keyword);
    }

    const cachingData: TDictionaryType = await useSessionStorage.getItem(
      CACHING_KEY.STORED_TRANSLATION,
    );
    if (cachingData?.keyword !== _keyword || cachingData?.country !== country) {
      await queryKeyword(country, _keyword, _dispatch);
      _dispatch({ type: RECOMMENDER_ACTION.SWITCH_LOADING, payload: false });
      return;
    }
    if (_setState) {
      await querySameKeyword(cachingData, _dispatch, _setState!);
      return;
    }
  } catch (error) {
    console.error(error);
    _dispatch({ type: RECOMMENDER_ACTION.SWITCH_LOADING, payload: false });
    _dispatch({ type: RECOMMENDER_ACTION.UPDATE_ERROR_MESSAGE });
  }
};

const queryKeyword = async (
  country: LANGUAGE_TYPE,
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  const params: TGetTranslationOfKeywordParams = {
    term: keyword,
    country: country,
  };

  const response = await getTranslationOfKeyword(params);
  const translatedData = response!.data.data;
  _dispatch({ type: RECOMMENDER_ACTION.STORE_KEYWORD_RESULT, payload: translatedData });

  _amplitudeKeywordTranslated(country, keyword);
  return;
};

const querySameKeyword = async (
  payload: TDictionaryType,
  _dispatch: Dispatch<TSearchActionType>,
  _setState: Dispatch<SetStateAction<boolean>>,
) => {
  const isOverSearch = payload.dictionaries.length > 5;
  if (isOverSearch) return false;

  const parms: TGetTranslationOfKeywordParams = {
    term: payload.keyword,
    country: payload.country,
  };

  const response = await getTranslationOfKeyword(parms);
  const translatedData = response!.data.data;

  _dispatch({ type: RECOMMENDER_ACTION.STORE_KEYWORD_RESULT, payload: translatedData });
  _setState(false);
  return true;
};

export const initializeKeyword = (
  setValue: UseFormSetValue<{ country: LANGUAGE_TYPE; searchWord: string }>,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  const preKeyword = useSessionStorage.getItem(CACHING_KEY.STORED_TRANSLATION);

  if (preKeyword) {
    setValue('country', preKeyword.country);
    setValue('searchWord', preKeyword.keyword);
    _dispatch({
      type: RECOMMENDER_ACTION.STORE_KEYWORD_RESULT,
      payload: preKeyword,
    });
  }
};

export const switchIsLoadingState = (
  _dispatch: Dispatch<TSearchActionType>,
  isLoading: boolean,
) => {
  _dispatch({ type: RECOMMENDER_ACTION.SWITCH_LOADING, payload: isLoading });
};

export const getTranslatorStatus = (translatorState: TTranslationKeywordType) => {
  if (translatorState.isError) return SEARCH_KEYWORD_STATUS.NONE_DATA_ERROR;
  if (isFalsy(translatorState.keyword) && isFalsy(translatorState.isLoading))
    return SEARCH_KEYWORD_STATUS.LANDING;
  if (translatorState.isLoading || isFalsy(translatorState.data?.dictionaries))
    return SEARCH_KEYWORD_STATUS.NONE_DATA_LOADING;
  return SEARCH_KEYWORD_STATUS.SUCCESS;
};
