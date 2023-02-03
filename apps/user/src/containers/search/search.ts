import { CountryType, TranslateType, useSearchQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';

import { ChangeEvent, KeyboardEvent, Dispatch } from 'react';
import { TAction, ActionKind, TSearchRef } from '@/containers/search';
import { isFalsy } from '@/utils/isFalsy';

export const getKeyword = (
  ref: TSearchRef,
  event: ChangeEvent<HTMLInputElement>,
): void => {
  const { current } = ref;
  current.text = event.target.value;
};

export const queryKeyword = (
  ref: TSearchRef,
  _dispatch: Dispatch<TAction>,
  event?: KeyboardEvent,
) => {
  if (event && event.key !== 'Enter') return;
  _dispatch({ type: ActionKind.SearchKeyword, payload: ref.current.text });
};

export const switchMode = (_dispatch: Dispatch<TAction>, status: boolean) => {
  _dispatch({ type: ActionKind.SwitchMode, payload: status });
};

export const GetQueryResult = (ref: TSearchRef) => {
  const { data, isLoading, isError } = useSearchQuery(
    graphQLClient,
    {
      country: CountryType.Vn,
      translateType: TranslateType.Order,
      text: ref.current.text,
    },
    {
      enabled: isFalsy(ref.current.text) === false,
      refetchOnWindowFocus: false,
    },
  );
  const res = data?.search;
  return [res, isLoading, isError];
};
