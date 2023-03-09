import { Dispatch, SetStateAction } from 'react';

export const isClickVerifyBtn = (
  _state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  const { firstCalled, theElseCalled } = _state;

  if (firstCalled === false) {
    const payload = Object.assign({}, _state, { firstCalled: true });
    _setState(payload);
    return;
  }

  const payload = Object.assign({}, _state, { theElseCalled: !theElseCalled });
  _setState(payload);
};
