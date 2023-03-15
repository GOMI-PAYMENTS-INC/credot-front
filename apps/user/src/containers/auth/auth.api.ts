import { Dispatch, SetStateAction } from 'react';
import {
  useSmsVerifyCodeConfirmQuery,
  CountryType,
  useFindAccountQuery,
  useSendSmsVerificationCodeMutation,
  useSendTemporaryPasswordMutation,
  FindPasswordInput,
} from '@/generated/graphql';
import { STATUS_CODE } from '@/types/enum.code';

import { graphQLClient } from '@/utils/graphqlCient';
import { isTruthy } from '@/utils/isTruthy';
import {
  clickVerifyBtn,
  activateVerifyCode,
  getVerifyCodeSignatureNumber,
  isAccountExisted,
  exccedVerifyTry,
} from '@/containers/auth/auth.container.refac';
import { UseFormSetError } from 'react-hook-form';

export const useFindAccount = (
  isVerification: TVerifyButtonState,
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TFindAccountErrorType>,
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
          const [error] = err.response.errors;

          setError('verifyCode', { message: error.message });
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
        //성공된 회면으로 전환
      },
      onError: (err) => {
        console.log(err, 'error');
        //없음
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
