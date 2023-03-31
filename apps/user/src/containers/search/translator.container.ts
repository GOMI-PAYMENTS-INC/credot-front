import { RECOMMANDER_ACTION } from '@/containers/search/reducer';
import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';

import { UseFormSetValue } from 'react-hook-form';
import { _getTranslationOfKeyword } from '@/containers/search/search.api';
import { CACHING_KEY } from '@/types/enum.code';

import { toast } from 'react-toastify';
import { useSessionStorage } from '@/utils/useSessionStorage';

export const switchTranslationTab = (
  _dispatch: Dispatch<TSearchActionType>,
  tabState: boolean,
) => _dispatch({ type: RECOMMANDER_ACTION.USE_TRANSLATION, payload: tabState });

export const searchKeyword = async (
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
  _setState?: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    if (isFalsy(keyword)) {
      toast.error('키워드를 입력해주세요.', { position: 'bottom-right' });
      return;
    }
    const cachingData: TDictionaryType = await useSessionStorage.getItem(
      CACHING_KEY.STORED_TRANSLATION,
    );
    if (cachingData?.keyword !== keyword) {
      await queryKeyword(keyword, _dispatch);
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
  const isOverSearch = payload.dictionaries.length > 9;
  if (isOverSearch) return false;

  const response = await _getTranslationOfKeyword(payload.keyword);
  const translatedData = response!.data.data;

  _dispatch({ type: RECOMMANDER_ACTION.STORE_KEYWORD_RESULT, payload: translatedData });
  _setState(false);
  return true;
};

export const initializeKeyword = (
  setValue: UseFormSetValue<{ keyword: string }>,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  const preKeyword = useSessionStorage.getItem(CACHING_KEY.STORED_TRANSLATION);

  if (preKeyword) {
    setValue('keyword', preKeyword.keyword);
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
