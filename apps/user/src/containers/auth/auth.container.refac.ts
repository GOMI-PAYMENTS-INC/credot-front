import { Dispatch, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { AUTH_RESPONSE_TYPE } from '@/types/enum.code';

export const findIdInitialState = {
  firstCalled: false,
  activeVerifyCode: false,
  theElseCalled: true,
  isExceeded: false,
  verifyCode: '',
  verifyCodeSignatureNumber: '',
  isExistedAccount: null,
};

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

export const activateVerifyCode = (
  _state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  _setState(Object.assign({}, _state, { activeVerifyCode: !_state.activeVerifyCode }));
};

export const getVerifyCodeSignatureNumber = (
  verifyCodeSignatureNumber: string,
  _state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  _setState(
    Object.assign({}, _state, { verifyCodeSignatureNumber: verifyCodeSignatureNumber }),
  );
};

export const isAccountExisted = (
  accountsLength: number | undefined,
  _state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  if (isFalsy(accountsLength)) {
    _setState(Object.assign({}, _state, { isExistedAccount: AUTH_RESPONSE_TYPE.EMPTY }));
    return;
  }
  _setState(Object.assign({}, _state, { isExistedAccount: AUTH_RESPONSE_TYPE.FILLED }));
};
