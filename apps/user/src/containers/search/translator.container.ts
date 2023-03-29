import { RECOMMANDER_ACTION } from '@/containers/search/reducer';
import { Dispatch, KeyboardEvent, MouseEvent } from 'react';
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
) => {
  try {
    if (isFalsy(keyword)) {
      toast.error('키워드를 입력해주세요.', { position: 'bottom-right' });
      return;
    }

    _dispatch({ type: RECOMMANDER_ACTION.SWITCH_LOADING, payload: true });

    const preKeyword: TDictionaryType = await useSessionStorage.getItem(
      CACHING_KEY.STORED_TRANSLATION,
    );

    if (preKeyword.keyword === keyword) {
      return await querySameKeyword(preKeyword, _dispatch);
    }
    _dispatch({ type: RECOMMANDER_ACTION.INITIALIZE_LIST });
    await queryKeyword(keyword, _dispatch);
  } catch (error) {
    console.error(error);
  }
};

const queryKeyword = async (keyword: string, _dispatch: Dispatch<TSearchActionType>) => {
  const response = await _getTranslationOfKeyword(keyword);
  const translatedData = response!.data.data;
  _dispatch({ type: RECOMMANDER_ACTION.STORE_KEYWORD_RESULT, payload: translatedData });
  _dispatch({ type: RECOMMANDER_ACTION.SEARCH_KEYWORD, payload: keyword });
};

const querySameKeyword = async (
  payload: TDictionaryType,
  _dispatch: Dispatch<TSearchActionType>,
) => {
  const isOverSearch = payload.dictionaries.length > 9;
  if (isOverSearch) return;

  const response = await _getTranslationOfKeyword(payload.keyword);
  const translatedData = response!.data.data;

  _dispatch({ type: RECOMMANDER_ACTION.STORE_KEYWORD_RESULT, payload: translatedData });

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
    _dispatch({
      type: RECOMMANDER_ACTION.INITIALIZE_SEARCH_KEYWORD,
      payload: preKeyword.keyword,
    });
  }
};

export const switcIsLoadingState = (_dispatch: Dispatch<TSearchActionType>) => {
  _dispatch({ type: RECOMMANDER_ACTION.SWITCH_LOADING, payload: true });
};
