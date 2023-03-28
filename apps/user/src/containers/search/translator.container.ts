import { RECOMMANDER_ACTION } from '@/containers/search/reducer';
import { Dispatch, KeyboardEvent, MouseEvent } from 'react';
import { isFalsy } from '@/utils/isFalsy';

import { UseFormSetValue } from 'react-hook-form';

import { CACHING_KEY } from '@/types/enum.code';
import { toast } from 'react-toastify';
import { useSessionStorage } from '@/utils/useSessionStorage';

import { DATA } from '@/containers/search/dummy';

export const switchTranslationTab = (
  _dispatch: Dispatch<TSearchActionType>,
  tabState: boolean,
) => _dispatch({ type: RECOMMANDER_ACTION.USE_TRANSLATION, payload: tabState });

export const searchKeyword = (
  keyword: string,
  _dispatch: Dispatch<TSearchActionType>,
  event: KeyboardEvent | MouseEvent,
) => {
  if (event.type === 'keyup') {
    const { key } = event as KeyboardEvent;
    if (key !== 'Enter') return;
  }

  if (isFalsy(keyword)) {
    toast.error('키워드를 입력해주세요.', { position: 'bottom-right' });
    return;
  }

  _dispatch({ type: RECOMMANDER_ACTION.SWITCH_LOADING, payload: true });

  const preKeyword: TCachingTranlatedData = useSessionStorage.getItem(
    CACHING_KEY.STORED_TRANSLATION,
  );

  if (preKeyword?.keyword === keyword) {
    querySameKeyword(preKeyword);
    return;
  }
  queryKeyword(keyword, _dispatch);
  _dispatch({ type: RECOMMANDER_ACTION.INITIALIZE_LIST });
};

const queryKeyword = async (keyword: string, _dispatch: Dispatch<TSearchActionType>) => {
  await setTimeout(() => {
    const payload = { keyword: keyword, data: DATA.data, count: 3 };
    useSessionStorage.setItem(CACHING_KEY.STORED_TRANSLATION, payload);
    _dispatch({ type: RECOMMANDER_ACTION.STORE_KEYWORD_RESULT, payload: DATA.data });
    _dispatch({ type: RECOMMANDER_ACTION.SEARCH_KEYWORD, payload: keyword });
  }, 3000);
};

const querySameKeyword = (payload: TCachingTranlatedData) => {
  if (payload.count === 3) return false;
  const _payload = Object.assign({}, payload, { count: payload.count + 1 });
  useSessionStorage.setItem(CACHING_KEY.STORED_TRANSLATION, _payload);
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
      payload: preKeyword.data,
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
