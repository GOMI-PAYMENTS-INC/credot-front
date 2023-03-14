import { Dispatch, SetStateAction } from 'react';
import {
  useSmsVerifyCodeConfirmQuery,
  CountryType,
  useFindAccountQuery,
  useSendSmsVerificationCodeMutation,
} from '@/generated/graphql';
import { PATH } from '@/types/enum.code';
import { graphQLClient } from '@/utils/graphqlCient';
import { isTruthy } from '@/utils/isTruthy';
import {
  isClickVerifyBtn,
  activateVerifyCode,
  getVerifyCodeSignatureNumber,
  isAccountExisted,
} from '@/containers/auth/auth.container.refac';
import { UseFormSetError } from 'react-hook-form';
import { isFalsy } from '@/utils/isFalsy';

export const useFindId = (
  isVerification: TVerifyButtonState,
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TFindAccountErrorType>,
  phone: string = '',
) => {
  const { firstCalled, theElseCalled } = isVerification;

  const { mutate: mutateRequestVerify } = useSendSmsVerificationCodeMutation(
    graphQLClient,
    {
      onSuccess: () => {
        activateVerifyCode(isVerification, setIsVerification);
      },
      onError: (err) => {
        const [response] = err.errors;
        if (firstCalled && theElseCalled) {
          setError('verifyCode', { message: response.message });
          return;
        }
        setError('phone', { message: response.message });
        isClickVerifyBtn(isVerification, setIsVerification, { theElseCalled: false });
      },
    },
  );

  const _verifyPhoneNumber = (phone: string = '') => {
    if (phone?.length !== 11) return;

    const payload = {
      phone: phone,
      country: CountryType.Kr,
    };

    mutateRequestVerify(payload);
  };

  const _authSmsVerifyCode = (phone: string = '') => {
    const { verifyCode } = isVerification;

    useSmsVerifyCodeConfirmQuery(
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
          }
        },
        onError: (err) => {
          const [response] = err.errors;
          setError('verifyCode', { message: response.message });
          return;
        },
      },
    );
  };

  const _getUserAccount = (user: { phone: string; verifyCodeSign: string }) => {
    // "상태에 따라 아이디가 없습니다."  | "아이디 출력"
    const { data } = useFindAccountQuery(
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

  return { _verifyPhoneNumber, _authSmsVerifyCode, _getUserAccount };
};
