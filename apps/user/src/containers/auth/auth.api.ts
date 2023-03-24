import { Dispatch, SetStateAction } from 'react';
import {
  useSmsVerifyCodeConfirmQuery,
  CountryType,
  useVerifyCodeQuery,
  useSendSmsVerificationCodeMutation,
  useSendTemporaryPasswordMutation,
  FindPasswordInput,
  useSignupMutation,
  MutationSignupArgs,
  useExistsUserEmailQuery,
} from '@/generated/graphql';
import { STATUS_CODE, PATH, TERM_TYPE } from '@/types/enum.code';
import { toast } from 'react-toastify';
import { graphQLClient } from '@/utils/graphqlCient';
import { isTruthy } from '@/utils/isTruthy';
import {
  clickVerifyBtn,
  activateVerifyCode,
  getVerifyCodeSignatureNumber,
  isAccountExisted,
  exccedVerifyTry,
  setWelcomeModalClosingTime,
} from '@/containers/auth/auth.container.refac';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { AUTH_ESSENTIAL } from '@/containers/auth/auth.constants';
import { _generalMobileVerified } from '@/amplitude/amplitude.service';

export const useVerifyCode = (
  isVerification: TVerifyButtonState,
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TAuthEssentialProps>,
) => {
  const { mutate: mutateRequestVerify } = useSendSmsVerificationCodeMutation(
    graphQLClient,
    {
      onSuccess: () => {
        activateVerifyCode(isVerification, setIsVerification);
      },
      onError: (err) => {
        const [error] = err.response.errors;
        if (String(error.extensions.code) === STATUS_CODE.NOT_RETRY_VERIFY_CODE) {
          exccedVerifyTry(isVerification, setIsVerification);

          return;
        }
        setError('phone', { message: error.message });
        clickVerifyBtn(isVerification, setIsVerification, { firstCalled: false });
      },
    },
  );

  const _getVerifyCode = (phone: string = '') => {
    if (phone?.length !== 11) return;

    const payload = {
      phone: phone,
      country: CountryType.Kr,
    };

    mutateRequestVerify(payload);
  };

  const _checkSmsVerifyCode = (phone: string = '') => {
    const { verifyCode } = isVerification;

    const { isSuccess } = useSmsVerifyCodeConfirmQuery(
      graphQLClient,
      { phone, verifyCode },
      {
        enabled: phone?.length === 11 && verifyCode?.length === 6,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
          setError('verifyCode', { message: undefined });
          const { signature } = res.smsVerifyCodeConfirm;
          if (signature) {
            getVerifyCodeSignatureNumber(signature, isVerification, setIsVerification);

            //앰플리튜드 전화번호 인증 완료 이벤트
            _generalMobileVerified(phone);
          }
        },
        onError: (err) => {
          const [error] = err.response.errors;

          setError('verifyCode', { message: error.message });
          return;
        },
      },
    );
    return [isSuccess];
  };

  const _getUserAccount = (user: { phone: string; verifyCodeSign: string }) => {
    // "상태에 따라 아이디가 없습니다."  | "아이디 출력"
    const { data } = useVerifyCodeQuery(
      graphQLClient,
      {
        user,
        country: CountryType.Kr,
      },
      {
        enabled: isTruthy(user.verifyCodeSign),
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
          isAccountExisted(
            res.findAccount.accounts?.length,
            isVerification,
            setIsVerification,
          );
        },
        onError: (err) => {
          // 계정 없음
        },
      },
    );

    return [data];
  };

  const { mutate: sendTemporaryPassword } = useSendTemporaryPasswordMutation(
    graphQLClient,
    {
      onSuccess: (res) => {
        if (res.sendTemporaryPassword.accounts) {
          isAccountExisted(
            res.sendTemporaryPassword.accounts.length,
            isVerification,
            setIsVerification,
          );
        }
      },
      onError: (err) => {
        isAccountExisted(undefined, isVerification, setIsVerification);
      },
    },
  );

  const _sendTemporaryPassword = (user: FindPasswordInput) => {
    const isValid = Object.values(user).every((userData) => isTruthy(userData));

    if (isValid) {
      const payload = {
        user,
        country: CountryType.Kr,
      };
      sendTemporaryPassword(payload);
    }
  };

  return { _getVerifyCode, _checkSmsVerifyCode, _getUserAccount, _sendTemporaryPassword };
};

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
    const isValid = Object.keys(value).filter((item) => {
      const key = item as keyof TAuthEssentialProps;
      if (key !== 'requiredAgreeTerm' && isFalsy(value[key])) {
        setError(key, { message: `${AUTH_ESSENTIAL[key]} 필수 값입니다.` });
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

    if (isFalsy(verifyCodeSignatureNumber))
      setError('verifyCode', { message: '인증번호를 입력해주세요.' });
    if (checkedTerms === false) {
      setError('requiredAgreeTerm', {
        message: '필수 이용약관과 개인정보 수집대한 안내 모두 동의해주세요.',
      });
    }

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
  return { _applyAccount, _isExistedAccount };
};
