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
  if (_state.firstCalled === false) {
    _setState(Object.assign({}, _state, { activeVerifyCode: true, firstCalled: true }));
    return;
  }
  _setState(Object.assign({}, _state, { activeVerifyCode: true, theElseCalled: true }));
};

export const exccedVerifyTry = (
  _state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  _setState(
    Object.assign({}, _state, {
      activeVerifyCode: true,
      firstCalled: true,
      theElseCalled: true,
      isExceeded: true,
    }),
  );
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

export const initializeAuteState = (
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => _setState(Object.assign({}, findIdInitialState));

export const eventHandlerByFindId = (isVerification: TVerifyButtonState) => {
  const eventOption = {
    phone: {
      className: 'button-filled-normal-large-primary-false-false-true ml-4 min-w-[102px]',
      text: '인증',
      disabled: false,
      phoneNumberInput: false,
    },
    verifyCodeInput: false,
  };

  if (isVerification.firstCalled && isVerification.theElseCalled === false) {
    eventOption.phone.className =
      'ml-4 min-w-[102px] rounded border border-grey-400 bg-white p-2.5 py-3 text-grey-800';
    eventOption.phone.text = '재발송';
  }

  if (
    (isVerification.firstCalled && isVerification.theElseCalled) ||
    isVerification.isExceeded
  ) {
    eventOption.phone.className =
      'ml-4 min-w-[102px] rounded border border-grey-400 bg-grey-50 p-2.5 py-3 text-grey-500';
    eventOption.phone.text = '재발송';
    eventOption.phone.disabled = true;
    eventOption.phone.phoneNumberInput = true;
  }

  if (
    isVerification.firstCalled &&
    isVerification.activeVerifyCode &&
    isVerification.theElseCalled === false
  ) {
    eventOption.phone.className =
      'ml-4 min-w-[102px] rounded border border-grey-400 bg-white p-2.5 py-3 text-grey-800';
    eventOption.phone.text = '재발송';
    eventOption.phone.disabled = false;
    eventOption.phone.phoneNumberInput = false;
  }

  return eventOption;
};
