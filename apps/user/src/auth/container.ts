import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { isFalsy } from '@/utils/isFalsy';
import { AUTH_RESPONSE_TYPE, CACHING_KEY, PATH, TERM_TYPE } from '@/types/enum.code';
import { FieldErrorsImpl, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import { mergeCopiedValue } from '@/utils/mergeCopiedValue';
import { TERMS_LIST } from '@/auth/constants';
import { NOTIFICATION_MESSAGE } from '@/constants/notification.constant';
import { useCookieStorage } from '@/utils/useCookieStorage';
import { useNavigate } from 'react-router-dom';

export const authInitialState: TVerifyButtonState = {
  firstCalled: false,
  activeVerifyCode: false,
  theElseCalled: true,
  isExceeded: false,
  isDuplicated: false,
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
  welcomeModalClosingTime: null,
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
  const filteredCheckedTerms = _state().checkedTerms.filter(
    (term: TTermsType) => term !== id,
  );
  _setState(_state({ checkedTerms: filteredCheckedTerms }));
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

export const isCheckedEssentialTerms = (state: TTermsCheckState) =>
  [TERM_TYPE.USE_AGREE, TERM_TYPE.PERSONAL_AGREE].every((term) =>
    state.checkedTerms.includes(term as TERM_TYPE),
  );

export const isReadyToSignUp = (
  isPassedVerifyCode: boolean,
  state: TTermsCheckState,
  _setState: Dispatch<SetStateAction<TTermsCheckState>>,
) => {
  const _state = mergeCopiedValue(state);

  if (isPassedVerifyCode && isCheckedEssentialTerms(state))
    return _setState(_state({ isReadyToSignUp: true }));

  _setState(_state({ isReadyToSignUp: false }));
};

export const setWelcomeModalClosingTime = (
  time: number,
  state: TTermsCheckState,
  _setState: Dispatch<SetStateAction<TTermsCheckState>>,
) => {
  const _state = mergeCopiedValue(state);
  _setState(_state({ welcomeModalClosingTime: time }));
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

export const exceptedVerifyTry = (
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
      isDuplication: false,
    }),
  );
};

export const duplicationVerifyTry = (
  state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  const _state = mergeCopiedValue(state);
  _setState(
    _state({
      activeVerifyCode: false,
      firstCalled: false,
      theElseCalled: true,
      isExceeded: false,
      isDuplication: true,
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

export const initializeAuthState = (
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
    setError('email', { message: NOTIFICATION_MESSAGE.emptyEmail });
    return false;
  }

  Object.keys(errors).forEach((keys) => {
    const key = keys as keyof TAuthEssentialProps;

    if (errors[key]?.message) {
      setError(key, { message: errors[key]?.message });
      return false;
    }
  });

  if (phoneNumber?.length === 11 && isFalsy(errors.phone?.message)) {
    clickVerifyBtn(state, _setState);
    return true;
  }

  setError('phone', { message: NOTIFICATION_MESSAGE.emptyPhoneNumber });
  return false;
};

export const signUpVerifyCode = (
  phoneNumber: string,
  state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
  errors: Partial<FieldErrorsImpl<TAuthEssentialProps>>,
  setError: UseFormSetError<TAuthEssentialProps>,
) => {
  if (phoneNumber?.length === 11 && isFalsy(errors.phone?.message)) {
    clickVerifyBtn(state, _setState);
    return true;
  }
  return false;
};

export const authReturnUrl = () => {
  const navigation = useNavigate();
  const saveReturnUrl = (returnUrl: string, goToUrl?: PATH) => {
    const encodeUrl = encodeURIComponent(returnUrl);
    useCookieStorage.setCookie(CACHING_KEY.RETURN_URL, encodeUrl, 1);
    if (goToUrl) {
      navigation(goToUrl);
    }
  };

  const moveToMain = (goToUrl?: PATH) => {
    const returnUrl = useCookieStorage.getCookie(CACHING_KEY.RETURN_URL);
    if (returnUrl) {
      useCookieStorage.removeCookie(CACHING_KEY.RETURN_URL);
      window.location.href = decodeURIComponent(returnUrl);
    } else {
      navigation(goToUrl ? goToUrl : PATH.SEARCH_PRODUCTS);
    }
  };
  return {
    saveReturnUrl,
    moveToMain,
  };
};
