import { Dispatch, SetStateAction } from 'react';

export const isClickVerifyBtn = (
  _state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
  option?: { firstCalled: boolean } | { theElseCalled: boolean },
) => {
  const { firstCalled, theElseCalled } = _state;

  if (firstCalled === false) {
    const payload = Object.assign({}, _state, { firstCalled: true });
    _setState(payload);
    return;
  }

  if (option) {
    const payload = Object.assign({}, _state, { option });
    _setState(payload);
    return;
  }

  const payload = Object.assign({}, _state, { theElseCalled: !theElseCalled });
  _setState(payload);
};
