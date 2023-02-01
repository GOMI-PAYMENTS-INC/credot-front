import { ChangeEvent, KeyboardEvent, Dispatch } from 'react';
import { TAction, ActionKind } from '@/containers/search';

export const getKeyword = (
  ref: { current: { keyword: string } },
  event: ChangeEvent<HTMLInputElement>,
): void => {
  const { current } = ref;
  current.keyword = event.target.value;
};

//검색
export const queryKeyword = (
  ref: { current: { keyword: string } },
  event: KeyboardEvent,
  _dispatch: Dispatch<TAction>,
) => {
  if (event.key !== 'Enter') return;
  _dispatch({ type: ActionKind.GetKeyword, payload: ref.current.keyword });
};
