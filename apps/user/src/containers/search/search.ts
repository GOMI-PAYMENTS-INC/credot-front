import { CountryType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';
import { ActionKind } from '@/containers/search';
import { ChangeEvent, KeyboardEvent, Dispatch, MouseEvent } from 'react';
import { isFalsy } from '@/utils/isFalsy';

export const getKeyword = (
  event: ChangeEvent<HTMLInputElement>,
  _dispatch: Dispatch<TAction>,
): void => {
  const { value } = event.target;
  _dispatch({ type: ActionKind.GetKeyword, payload: value });
};

export const queryKeywordByClick = (text: string, _dispatch: Dispatch<TAction>) => {
  _dispatch({ type: ActionKind.GetKeyword, payload: text });
  _dispatch({ type: ActionKind.SearchKeyword, payload: text });
};

export const queryKeyword = (
  text: string,
  _dispatch: Dispatch<TAction>,
  event: KeyboardEvent | MouseEvent,
) => {
  if (event.type === 'keydown') {
    const { key } = event as KeyboardEvent;
    if (key !== 'Enter') return;
  }
  const _switch = isFalsy(text) === false;

  _dispatch({ type: ActionKind.SwitchMode, payload: _switch });
  _dispatch({ type: ActionKind.SearchKeyword });
};

export const initializeState = (window: Window, _dispatch: Dispatch<TAction>) => {
  _dispatch({ type: ActionKind.InitializeState, payload: window.store });
};

export const switchMode = (_dispatch: Dispatch<TAction>, status: boolean) => {
  _dispatch({ type: ActionKind.SwitchMode, payload: status });
};

export const GetQueryResult = (keyword: string) => {
  const { data, isLoading, isError } = useSearchQuery(
    graphQLClient,
    {
      country: CountryType.Vn,
      text: keyword,
    },
    {
      enabled: isFalsy(keyword) === false,
      refetchOnWindowFocus: false,
    },
  );
  const response = data?.search;
  return [response, isLoading, isError];
};
