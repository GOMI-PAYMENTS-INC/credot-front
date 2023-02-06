import { CountryType, useSearchQuery } from '@/generated/graphql';
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
      text: ref.current.text,
    },
    {
      enabled: isFalsy(ref.current.text) === false,
      refetchOnWindowFocus: false,
    },
  );
  const response = data?.search;
  return [response, isLoading, isError];
};
