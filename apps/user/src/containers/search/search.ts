import { ChangeEvent, KeyboardEvent, Dispatch } from 'react';
import { TAction, ActionKind, TSearchRef } from '@/containers/search';

export const getKeyword = (
  ref: TSearchRef,
  event: ChangeEvent<HTMLInputElement>,
): void => {
  const { current } = ref;
  current.text = event.target.value;
};

export const queryKeyword = (
  ref: TSearchRef,
  event: KeyboardEvent,
  _dispatch: Dispatch<TAction>,
) => {
  if (event.key !== 'Enter') return;
  _dispatch({ type: ActionKind.SearchKeyword, payload: ref.current.text });
};

export const switchMode = (_dispatch: Dispatch<TAction>, status: boolean) => {
  _dispatch({ type: ActionKind.SwitchMode, payload: status });
};
