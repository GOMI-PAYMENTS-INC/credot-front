import { Dispatch, SetStateAction } from 'react';
import {
  useSignupMutation,
  MutationSignupArgs,
  useExistsUserEmailQuery,
  useGoogleSignupMutation,
} from '@/generated/graphql';
import { TERM_TYPE } from '@/types/enum.code';
import { toast } from 'react-toastify';
import { graphQLClient } from '@/utils/graphqlCient';

import { setWelcomeModalClosingTime } from '@/containers/auth/auth.container';
import { UseFormSetError } from 'react-hook-form';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { AUTH_ESSENTIAL } from '@/constants/auth.constants';
import { _generalMobileVerified } from '@/amplitude/amplitude.service';
import { NOTIFICATION_MESSAGE } from '@/constants/notification.constant';
import { _signupSignupCompleted } from '@/amplitude/amplitude.service';
import { AccountType } from '@/amplitude/amplitude.enum';

export const useSignUp = () => {
  const { mutate: signUpMutate } = useSignupMutation(graphQLClient, {
    onError: () => {
      toast.error('회원가입 실패하였습니다. 입력값을 재확인 하십시오.');
    },
  });

  const _applyAccount = (
    value: TAuthEssentialProps,
    verifyCodeSignatureNumber: string,
    signUpEvent: TTermsCheckState,
    setSignupEvent: Dispatch<SetStateAction<TTermsCheckState>>,
    setError: UseFormSetError<TAuthEssentialProps>,
  ) => {
    if (/^\s+|\s+$/g.test(value.password) === true)
      return setError('password', { message: NOTIFICATION_MESSAGE.whiteSpace });

    const isValid = Object.keys(value).filter((item) => {
      const key = item as keyof TAuthEssentialProps;
      if (isFalsy(value[key])) {
        setError(key, { message: AUTH_ESSENTIAL[key] });
        return false;
      }
      return true;
    });
    //FIXME: validation 로직은 비즈니스로 옮기기
    const checkedTerms = [TERM_TYPE.PERSONAL_AGREE, TERM_TYPE.USE_AGREE].every((term) =>
      signUpEvent.checkedTerms.includes(term),
    );
    const isValidVerifyCodeSign = isFalsy(verifyCodeSignatureNumber);
    const isValidTerms = isFalsy(checkedTerms);

    if (isValid.length !== 5 || isValidVerifyCodeSign || isValidTerms) return;

    const { email, password, phone } = value;

    const payload = {
      email: email,
      password: password,
      name: '',
      phone: phone,
      verifyCodeSign: verifyCodeSignatureNumber,
    };

    const signupFormValue: MutationSignupArgs = {
      user: { ...payload },
    };

    signUpMutate(signupFormValue, {
      onSuccess: (res) => {
        if (res.signup.token) {
          authTokenStorage.setToken(res.signup.token);
        }
        setWelcomeModalClosingTime(1500, signUpEvent, setSignupEvent);
      },
    });
  };

  const _isExistedAccount = (
    email: string,
    triggerConfirmEmail: boolean,
    setError: UseFormSetError<TAuthEssentialProps>,
  ) => {
    const regex: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    return useExistsUserEmailQuery(
      graphQLClient,
      { email },
      {
        enabled: regex.test(email) === true && triggerConfirmEmail,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
          if (res.existsUserEmail) {
            setError('email', {
              type: 'custom',
              message: '이미 가입된 이메일 주소입니다.',
            });
          }
        },
        onError: () => {
          setError('email', { type: 'custom', message: undefined });
        },
      },
    );
  };

  const { mutate: signUpSocialMutate } = useGoogleSignupMutation(graphQLClient, {
    onError: () => {
      toast.error('회원 가입 실패하였습니다. 입력값을 재확인 하십시오.');
    },
  });

  const _applySocialAccount = (
    value: {
      phone: string;
      email: string;
      verifyCode: string;
      requiredAgreeTerm: TTermsType[] | string[];
    },
    token: string,
    signUpEvent: TTermsCheckState,
    setSignupEvent: Dispatch<SetStateAction<TTermsCheckState>>,
    setError: UseFormSetError<TAuthEssentialProps>,
  ) => {
    const { email, phone, verifyCode, requiredAgreeTerm } = value;

    const isCheckedTerms = [TERM_TYPE.PERSONAL_AGREE, TERM_TYPE.USE_AGREE].every((term) =>
      requiredAgreeTerm.includes(term),
    );
    const isValidVerifyCodeSign = isFalsy(verifyCode);
    const isValidTerms = isFalsy(isCheckedTerms);

    const isValid = Object.keys(value).filter((item) => {
      const key = item as 'email' | 'phone' | 'requiredAgreeTerm' | 'verifyCode';
      if (isFalsy(value[key])) {
        setError(key, { message: AUTH_ESSENTIAL[key] });
        return false;
      }
      return true;
    });

    if (isValid.length !== 4 || isValidVerifyCodeSign || isValidTerms) return;

    const payload = {
      idToken: token,
      phone: phone,
      verifyCodeSign: verifyCode,
    };

    signUpSocialMutate(
      { socialSignUpDto: payload },
      {
        onSuccess: (res) => {
          if (res.googleSignUp.token) {
            setWelcomeModalClosingTime(1500, signUpEvent, setSignupEvent);
            authTokenStorage.setToken(res.googleSignUp.token);
          }
          _signupSignupCompleted(AccountType.LOCAL, email, phone, false);
        },
      },
    );
  };

  return { _applyAccount, _isExistedAccount, _applySocialAccount };
};
