import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { LoginStateAtom } from '@/atom/auth/auth-atom';
import {
  LoginInput,
  MutationLoginArgs,
  MutationSignupArgs,
  SendSmsVerificationCodeMutationVariables,
  SignUpInput,
  useLoginMutation,
  useMeQuery,
  useSendSmsVerificationCodeMutation,
  useSignupMutation,
} from '@/generated/graphql';
import { Paths } from '@/router/paths';
import { GlobalEnv } from '@/utils/config';
import { graphQLClient } from '@/utils/graphql-client';

export const AuthContainer = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginStateAtom);
  const [token, setToken] = useState<string | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChangeLoginState = (state: boolean) => {
    setIsLogin(state);
  };
  const clearLogin = () => {
    setToken(null);
    handleChangeLoginState(false);
    localStorage.removeItem(GlobalEnv.tokenKey);
  };
  const onLogout = () => {
    clearLogin();
    navigate(Paths.signIn);
  };

  const { mutate: sendSmsVerificationCodeMutate } = useSendSmsVerificationCodeMutation(
    graphQLClient,
    {
      onSuccess: () => {
        toast.success('발송 성공하였습니다.');
      },
      onError: (err) => {
        console.error('sendSmsVerificationCodeMutate error : ', err);
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
        // TODO home -> sign-up-welcome.page 이동 변경 필요.
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

  const { data: userInfo, refetch: refetchUserInfo } = useMeQuery(
    graphQLClient,
    {},
    {
      onSuccess: () => {
        const storageToken = localStorage.getItem(GlobalEnv.tokenKey);
        setToken(storageToken);
        handleChangeLoginState(true);
      },
      onError: () => onLogout(),
      enabled: !!token,
    },
  );

  const { mutate: loginMutate } = useLoginMutation(graphQLClient, {
    onSuccess: (res) => {
      setToken(res.login.token);
      localStorage.setItem(GlobalEnv.tokenKey, res.login.token);
      navigate(Paths.home);
    },
    onError: (err) => {
      const error = JSON.parse(JSON.stringify(err));
      toast.error(error.response.errors[0].message);
    },
  });

  const onSubmitSignIn = (value: LoginInput) => {
    const loginFormValue: MutationLoginArgs = {
      login: {
        email: value.email,
        password: value.password,
      },
    };
    loginMutate(loginFormValue);
  };

  useEffect(() => {
    if (token) {
      graphQLClient.setHeader('authorization', `bearer ${token}`);
      refetchUserInfo();
    }
  }, [token]);

  useEffect(() => {
    const storageToken = localStorage.getItem(GlobalEnv.tokenKey);
    if (storageToken) {
      setToken(storageToken);
    } else {
      handleChangeLoginState(false);
      if (
        !Object.values(Paths).find((d) => d === pathname) &&
        !pathname.startsWith(Paths.signIn)
      ) {
        navigate(Paths.signIn);
      }

      clearLogin();
    }
  }, []);

  return {
    onSendSmsVerifyCode,
    onSubmitSignUp,
    onSubmitSignIn,
    onLogout,
    userInfo,
    isLogin,
  };
};
