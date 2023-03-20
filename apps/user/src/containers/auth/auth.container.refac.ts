import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { AUTH_RESPONSE_TYPE, TERM_TYPE } from '@/types/enum.code';
import { UseFormSetError, FieldErrorsImpl, UseFormSetValue } from 'react-hook-form';
import { mergeCopiedValue } from '@/utils/mergeCopiedValue';
import { TERMS_LIST } from './auth.constants';

export const authInitialState: TVerifyButtonState = {
  firstCalled: false,
  activeVerifyCode: false,
  theElseCalled: true,
  isExceeded: false,
  verifyCode: '',
  verifyCodeSignatureNumber: '',
  isExistedAccount: null,
};

export const termInitialState: TTermsCheckState = {
  checkedTerms: [],
  isDetailOpen: [],
  triggerConfirmEmail: false,
  agreedAllTerms: false,
  isReadyToSignUp: false,
};

export const selectTerm = (
  event: ChangeEvent<HTMLInputElement>,
  state: TTermsCheckState,
  _setState: Dispatch<SetStateAction<TTermsCheckState>>,
) => {
  const _state = mergeCopiedValue(state);
  const { checked, id } = event.target;

  if (checked) {
    const addedTerms = state.checkedTerms.concat(id as TTermsType);
    _setState(_state({ checkedTerms: addedTerms }));
    return;
  }
  const filteredcheckedTerms = _state().checkedTerms.filter(
    (term: TTermsType) => term !== id,
  );
  _setState(_state({ checkedTerms: filteredcheckedTerms }));
};

export const selectAllTerms = (
  event: ChangeEvent<HTMLInputElement>,
  state: TTermsCheckState,
  _setState: Dispatch<SetStateAction<TTermsCheckState>>,
) => {
  const _state = mergeCopiedValue(state);
  const { checked } = event.target;

  if (checked) {
    const termIDs = TERMS_LIST.map((term) => term.id);
    const addedTerms = state.checkedTerms.concat(termIDs as TTermsType[]);
    _setState(_state({ checkedTerms: addedTerms, agreedAllTerms: checked }));
    return;
  }
  _setState(_state({ checkedTerms: [], agreedAllTerms: checked }));
};

export const openDetailTermContent = (
  index: number,
  state: TTermsCheckState,
  _setState: Dispatch<SetStateAction<TTermsCheckState>>,
) => {
  const _state = mergeCopiedValue(state);
  const updatedList =
    state.isDetailOpen.find((term) => term === index) === undefined
      ? _state().isDetailOpen.concat(index)
      : _state().isDetailOpen.filter((item: number) => item !== index);

  _setState(_state({ isDetailOpen: updatedList }));
};

export const assignEmail = (
  event: ChangeEvent<HTMLInputElement>,
  state: TTermsCheckState,
  _setState: Dispatch<SetStateAction<TTermsCheckState>>,
) => {
  const regex: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (regex.test(event.target.value.trim()) === false) return;
  const _state = mergeCopiedValue(state);
  _setState(_state({ triggerConfirmEmail: true }));
};

export const isReadyToSignUp = (
  isPassedVerifyCode: boolean,
  state: TTermsCheckState,
  _setState: Dispatch<SetStateAction<TTermsCheckState>>,
) => {
  const _state = mergeCopiedValue(state);

  const checkTerms = [TERM_TYPE.USE_AGREE, TERM_TYPE.PERSONAL_AGREE].every((term) =>
    state.checkedTerms.includes(term as TERM_TYPE),
  );

  if (isPassedVerifyCode && checkTerms)
    return _setState(_state({ isReadyToSignUp: true }));

  _setState(_state({ isReadyToSignUp: false }));
};

export const maskingPhone = (phone: string) => {
  return phone
    .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    .split('-')
    .reduce((pre, cur, idx) => (idx === 1 ? pre + '****' : pre + cur), '');
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
  setValue: UseFormSetValue<TAuthEssentialProps>,
) => {
  _setState(mergeCopiedValue(authInitialState)());
  const types = ['phone', 'verifyCode', 'email'] as const;
  types.forEach((type) => setValue(type, ''));
};

export const eventHandlerByFindAccount = (isVerification: TVerifyButtonState) => {
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
  errors: Partial<FieldErrorsImpl<TAuthEssentialProps>>,
  state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TAuthEssentialProps>,
  email?: string,
) => {
  if (email !== undefined && isFalsy(email)) {
    setError('email', { message: '이메일은 필수입력입니다.' });
    return false;
  }

  if (phoneNumber?.length === 11 && isFalsy(errors.phone)) {
    clickVerifyBtn(state, _setState);
    return true;
  }

  setError('phone', { message: '휴대폰 번호를 확인해주세요.' });
  return false;
};
