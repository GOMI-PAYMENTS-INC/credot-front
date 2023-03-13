import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  useSmsVerifyCodeConfirmQuery,
  CountryType,
  FindAccountQueryVariables,
  useFindAccountQuery,
  useSendSmsVerificationCodeMutation,
  SendSmsVerificationCodeMutationVariables,
  useSignupMutation,
} from '@/generated/graphql';
import { PATH } from '@/types/enum.code';
import { graphQLClient } from '@/utils/graphqlCient';

import { isClickVerifyBtn } from '@/containers/auth/auth.container.refac';
import { UseFormSetError } from 'react-hook-form';

export const useSmsVerify = (
  phone: string = '',
  isVerifcication: TVerifyButtonState,
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>,
  setError: UseFormSetError<TFindAccountErrorType>,
) => {
  const { firstCalled, theElseCalled } = isVerifcication;

  const {
    mutate: mutateRequestVerify,
    data,
    isError,
    isLoading,
  } = useSendSmsVerificationCodeMutation(graphQLClient, {
    onSuccess: () => {
      isClickVerifyBtn(isVerifcication, setIsVerification);
    },
    onError: (err) => {
      const [response] = err.errors;
      if (firstCalled && theElseCalled) {
        setError('verifyCode', { message: response.message });
        return;
      }
      setError('phone', { message: response.message });
      isClickVerifyBtn(isVerifcication, setIsVerification, { theElseCalled: false });
    },
  });

  const payload = {
    phone: phone,
    country: CountryType.Kr,
  };
  console.log('hi');
  const _verifyPhoneNumber = () => {
    if (phone?.length !== 11 || firstCalled === true) return;
    mutateRequestVerify(payload);
  };
  return { _verifyPhoneNumber, data, isLoading };
};

// 회원가입 시작

export const authVerifyCodeContainer = () => {
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [verifyCodeSign, setVerifyCodeSign] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const onConfirmVerifyCode = useSmsVerifyCodeConfirmQuery(
    graphQLClient,
    { phone, verifyCode },
    {
      enabled: !!verifyCode && verifyCode.length > 5,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data.smsVerifyCodeConfirm.signature) {
          setVerifyCodeSign(data.smsVerifyCodeConfirm.signature);
        }
      },
      onError: (err) => {
        const error = JSON.parse(JSON.stringify(err));
        console.error('onChangeVerifyCodeCheck error : ', error);
      },
    },
  );

  return {
    verifyCodeSign,
    setVerifyCodeSign,
    setVerifyCode,
    setPhone,
    onConfirmVerifyCode,
  };
};

export const findUserContainer = () => {
  // 아이디 찾기 변수 값
  const [findAccount, setFindAccount] = useState<FindAccountQueryVariables>();
  const [responseStatus, setResponseStatus] = useState<number>(0);

  const { data: findAccountQuery } = useFindAccountQuery(
    graphQLClient,
    {
      user: !findAccount?.user
        ? {
            phone: '',
            verifyCodeSign: '',
          }
        : findAccount.user,
      country: findAccount?.country ? findAccount.country : CountryType.Vn,
    },
    {
      enabled: !!findAccount,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        console.log('useFindAccountQuery success', res);
      },
      onError: (err) => {
        const error = JSON.parse(JSON.stringify(err));
        setResponseStatus(error.response.errors[0].extensions.exception.status);
      },
    },
  );

  return {
    setFindAccount,
    findAccountQuery,
    responseStatus,
  };
};
