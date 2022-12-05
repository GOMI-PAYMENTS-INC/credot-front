import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { LoginStateAtom } from '@/atom/auth/auth-atom';
import {
  CountryType,
  FindAccountQueryVariables,
  GoogleLoginMutationVariables,
  LoginInput,
  MutationLoginArgs,
  MutationSignupArgs,
  SendSmsVerificationCodeMutationVariables,
  SignUpInput,
  useFindAccountQuery,
  useGoogleLoginMutation,
  useLoginMutation,
  useSendSmsVerificationCodeMutation,
  useSignupMutation,
} from '@/generated/graphql';
import { Paths } from '@/router/paths';
import { GlobalEnv } from '@/utils/config';
import { graphQLClient } from '@/utils/graphql-client';

export const AuthContainer = () => {
  const [findAccount, setFindAccount] = useState<FindAccountQueryVariables>();
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

  useEffect(() => {
    findAccountQuery;
  }, [findAccount]);

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
  ) => sendSmsVerificationCodeMutate(sendSmsVerifyCode);

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

  const { mutate: loginMutate } = useLoginMutation(graphQLClient, {
    onSuccess: (res) => {
      setToken(res.login.token);
      localStorage.setItem(GlobalEnv.tokenKey, res.login.token);
      // TODO home -> sign-up-welcome.page 이동 변경 필요.
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

  const { mutate: googleLoginMutate } = useGoogleLoginMutation(graphQLClient, {
    onSuccess: (res) => {
      console.log('google token : ', res.googleLogin.token);
      setToken(res.googleLogin.token);
      localStorage.setItem(GlobalEnv.tokenKey, res.googleLogin.token);
      // TODO home -> sign-up-welcome.page 이동 변경 필요.
      navigate(Paths.home);
    },
  });

  const onGoogleLoginButton = ({ idToken }: GoogleLoginMutationVariables) => {
    googleLoginMutate({ idToken });
  };
  const handleCredentialResponse = (response: CredentialResponse) => {
    if (response.credential) onGoogleLoginButton({ idToken: response.credential });
  };

  useEffect(() => {
    console.log('token : ', token);
    if (token) {
      graphQLClient.setHeader('authorization', `bearer ${token}`);
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

    window.google?.accounts.id.initialize({
      client_id: GlobalEnv.viteGoogleClientId,
      callback: handleCredentialResponse,
    });
    window.google?.accounts.id.renderButton(
      document.getElementById('google-login-button') as HTMLElement,
      {
        type: 'icon',
        theme: 'outline',
        shape: 'circle',
        width: '256px',
      },
    );
  }, []);

  const { data: findAccountQuery, error: findAccountQueryError } = useFindAccountQuery(
    graphQLClient,
    {
      user: !findAccount?.user
        ? {
            phone: '',
            verifyCode: '',
          }
        : findAccount.user,
      country: findAccount?.country ? findAccount.country : CountryType.Vn,
    },
    {
      onSuccess: (res) => {
        // console.log('useFindAccountQuery success', res);
      },
      onError: (err) => {
        // console.log('useFindAccountQuery error', err);
      },
    },
  );

  return {
    onSendSmsVerifyCode,
    onSubmitSignUp,
    onSubmitSignIn,
    onLogout,
    onGoogleLoginButton,
    token,
    findAccountQuery,
    findAccountQueryError,
    setFindAccount,
  };
};
