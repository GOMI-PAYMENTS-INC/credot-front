import { RECOMMANDER_ACTION } from '@/containers/search/reducer';
import { Dispatch, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { UseFormSetValue } from 'react-hook-form';

import { _getTranslationOfKeyword } from '@/containers/search/search.api';
import { CACHING_KEY } from '@/types/enum.code';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { SEARCH_KEYWORD_STATUS } from '@/containers/search/emun';

export const switchTranslationTab = (
  _dispatch: Dispatch<TSearchActionType>,
  tabState: boolean,
) => _dispatch({ type: RECOMMANDER_ACTION.USE_TRANSLATION, payload: tabState });

export const searchKeyword = async (
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
  _setState?: Dispatch<SetStateAction<boolean>> | null,
  setValue?: UseFormSetValue<{ searchWord: string }>,
) => {
  try {
    let _keyword = keyword || '수분 크림';
    if (isFalsy(keyword) && setValue) setValue('searchWord', _keyword);

    const cachingData: TDictionaryType = await useSessionStorage.getItem(
      CACHING_KEY.STORED_TRANSLATION,
    );
    if (cachingData?.keyword !== _keyword) {
      await queryKeyword(_keyword, _dispatch);
      _dispatch({ type: RECOMMANDER_ACTION.SWITCH_LOADING, payload: false });
      return;
    }
    if (_setState) {
      await querySameKeyword(cachingData, _dispatch, _setState!);
      return;
    }
  } catch (error) {
    console.error(error);
    _dispatch({ type: RECOMMANDER_ACTION.SWITCH_LOADING, payload: false });
    _dispatch({ type: RECOMMANDER_ACTION.UPDATE_ERROR_MESSAGE });
  }
};

const queryKeyword = async (keyword: string, _dispatch: Dispatch<TSearchActionType>) => {
  const response = await _getTranslationOfKeyword(keyword);
  const translatedData = response!.data.data;
  _dispatch({ type: RECOMMANDER_ACTION.STORE_KEYWORD_RESULT, payload: translatedData });
  return;
};

const querySameKeyword = async (
  payload: TDictionaryType,
  _dispatch: Dispatch<TSearchActionType>,
  _setState: Dispatch<SetStateAction<boolean>>,
) => {
  const isOverSearch = payload.dictionaries.length > 5;
  if (isOverSearch) return false;

  const response = await _getTranslationOfKeyword(payload.keyword);
  const translatedData = response!.data.data;

  _dispatch({ type: RECOMMANDER_ACTION.STORE_KEYWORD_RESULT, payload: translatedData });
  _setState(false);
  return true;
};

export const initializeKeyword = (
  setValue: UseFormSetValue<{ searchWord: string }>,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  const preKeyword = useSessionStorage.getItem(CACHING_KEY.STORED_TRANSLATION);

  if (preKeyword) {
    setValue('searchWord', preKeyword.keyword);
    _dispatch({
      type: RECOMMANDER_ACTION.STORE_KEYWORD_RESULT,
      payload: preKeyword,
    });
  }
};

export const switchIsLoadingState = (
  _dispatch: Dispatch<TSearchActionType>,
  isLoading: boolean,
) => {
  _dispatch({ type: RECOMMANDER_ACTION.SWITCH_LOADING, payload: isLoading });
};

export const getTranslatorStatus = (translatorState: TTranslationKeywordType) => {
  if (isFalsy(translatorState.keyword) && isFalsy(translatorState.isLoading))
    return SEARCH_KEYWORD_STATUS.LANDING;
  if (isFalsy(translatorState.data) && translatorState.isError)
    return SEARCH_KEYWORD_STATUS.NONE_DATA_ERROR;
  if (translatorState.isLoading || isFalsy(translatorState.data?.dictionaries))
    return SEARCH_KEYWORD_STATUS.NONE_DATA_LOADING;
  return SEARCH_KEYWORD_STATUS.SUCCESS;
};
