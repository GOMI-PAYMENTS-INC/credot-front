import {
  MutationSignupArgs,
  SendSmsVerificationCodeMutationVariables,
  SignUpInput,
  useSendSmsVerificationCodeMutation,
  useSignupMutation,
} from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphql-client';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { GlobalEnv } from '@/utils/config';
import { Paths } from '@/router/paths';
import { useNavigate } from 'react-router-dom';

export const AuthContainer = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate: sendSmsVerificationCodeMutate } = useSendSmsVerificationCodeMutation(
    graphQLClient,
    {
      onSuccess: (res) => {
        toast.success('발송 성공하였습니다.');
      },
      onError: (err) => {
        toast.error('발송 실패하였습니다.');
      },
    },
  );

  const onSendSmsVerifyCode = (
    sendSmsVerifyCode: SendSmsVerificationCodeMutationVariables,
  ) => {
    sendSmsVerificationCodeMutate(sendSmsVerifyCode);
  };

  const { mutate: signUpMutate } = useSignupMutation(graphQLClient, {
    onSuccess: (res) => {
      if (res.signup.token) {
        setToken(res.signup.token);
        localStorage.setItem(GlobalEnv.tokenKey, res.signup.token);
        // TODO  sign-up-welcome.page 이동
        navigate(Paths.home);
      }
    },
    onError: (err) => {
      const error = JSON.parse(JSON.stringify(err));
      console.log(error.errors[0].message);
      toast.error('회원 가입 실패하였습니다. 입력값을 재확인 하십시오.');
    },
  });

  const onSubmitSignUp = (value: SignUpInput) => {
    const signupFormValue: MutationSignupArgs = {
      user: {
        name: value.name,
        email: value.email,
        password: value.password,
        nickName: value.nickName,
        phone: value.phone,
        verifyCode: value.verifyCode,
      },
    };
    signUpMutate(signupFormValue);
  };

  return { onSendSmsVerifyCode, onSubmitSignUp };
};
