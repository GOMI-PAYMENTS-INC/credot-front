import { isFalsy } from '@/utils/isFalsy';
import type { Dispatch, SetStateAction } from 'react';

export const updateState = (
  state: TCheckboxOption[],
  incomeItem: TCheckboxOption,
  _dispatch: Dispatch<SetStateAction<TCheckboxOption[]>>,
) => {
  if (state[0].value === 'hidden' || isFalsy(state)) {
    return _dispatch([incomeItem]);
  }

  const _state: TCheckboxOption[] = structuredClone(state);
  let payload;
  const hasSameValue = _state.find((itme) => itme.value === incomeItem.value);

  if (isFalsy(hasSameValue)) {
    payload = _state.concat(incomeItem);
  } else {
    payload = _state.filter((item) => item.value !== incomeItem.value);
  }

  return _dispatch(payload);
};
