import { Dispatch, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { AUTH_RESPONSE_TYPE } from '@/types/enum.code';
import { UseFormSetError, FieldErrorsImpl } from 'react-hook-form';
import { mergeCopiedValue } from '@/utils/mergeCopiedValue';

export const findIdInitialState = {
  firstCalled: false,
  activeVerifyCode: false,
  theElseCalled: true,
  isExceeded: false,
  verifyCode: '',
  verifyCodeSignatureNumber: '',
  isExistedAccount: null,
};

export const clickVerifyBtn = (
  state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
  option?: { firstCalled: boolean } | { theElseCalled: boolean },
) => {
  const { firstCalled, theElseCalled } = state;
  const _state = mergeCopiedValue(state);
  if (firstCalled === false) {
    _setState(_state({ firstCalled: true }));
    return;
  }

  if (option) {
    _setState(_state(option));
    return;
  }

  _setState(_state({ theElseCalled: !theElseCalled }));
};

export const activateVerifyCode = (
  state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  const _state = mergeCopiedValue(state);
  if (state.firstCalled === false) {
    _setState(
      _state({
        activeVerifyCode: true,
        firstCalled: true,
      }),
    );
    return;
  }
  _setState(Object.assign({}, state, { activeVerifyCode: true, theElseCalled: true }));
};

export const exccedVerifyTry = (
  state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  const _state = mergeCopiedValue(state);

  _setState(
    _state({
      activeVerifyCode: true,
      firstCalled: true,
      theElseCalled: true,
      isExceeded: true,
    }),
  );
};

export const getVerifyCodeSignatureNumber = (
  verifyCodeSignatureNumber: string,
  state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  const _state = mergeCopiedValue(state);
  _setState(_state({ verifyCodeSignatureNumber: verifyCodeSignatureNumber }));
};

export const isAccountExisted = (
  accountsLength: number | undefined,
  state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  const _state = mergeCopiedValue(state);
  if (isFalsy(accountsLength)) {
    _setState(_state({ isExistedAccount: AUTH_RESPONSE_TYPE.EMPTY }));
    return;
  }
  _setState(_state({ isExistedAccount: AUTH_RESPONSE_TYPE.FILLED }));
};

export const initializeAuteState = (
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => _setState(mergeCopiedValue(findIdInitialState)());

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

export const isPhoneVerifyPrepared = (
  phoneNumber: string,
  errors: Partial<FieldErrorsImpl<TFindAccountErrorType>>,
  state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TFindAccountErrorType>,
) => {
  if (phoneNumber?.length === 11 && isFalsy(errors.phone)) {
    clickVerifyBtn(state, _setState);
    return true;
  }

  setError('phone', { message: '핸드폰 번호를 확인해주세요.' });
  return false;
};
