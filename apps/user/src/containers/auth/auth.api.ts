import { useState } from 'react';
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
import { toast } from 'react-toastify';
import { authTokenStorage } from '@/utils/authToken';

export const useSmsVerify = async (number: string = '') => {
  const payload = {
    phone: '01032982455',
    country: CountryType.Kr,
  };

  const {
    mutate: mutateRequestVerify,
    data,
    isError,
  } = useSendSmsVerificationCodeMutation(graphQLClient, {
    onSuccess: async (res) => {
      console.log(res, 'res');

      // setSending(true);
    },
    onError: (err) => {
      console.log(err, 'err');
      // setSending(false);
    },
  });
  try {
  } catch (error) {}
  const res = await mutateRequestVerify(payload);
  console.log(res, 'Res');
  console.log(data, 'data');

  //   return mutateRequestVerify(payload);
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
