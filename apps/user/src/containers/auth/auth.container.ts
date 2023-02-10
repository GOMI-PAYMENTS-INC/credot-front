import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import {
  IsLoginStorageAtom,
  IsTemporaryPasswordLoginAtom,
  LoginStateAtom,
  LoginTokenAtom,
  SocialTokenAtom,
} from '@/atom/auth/auth-atom';
import {
  ChangePasswordInput,
  GoogleLoginMutationVariables,
  GoogleSignUpInput,
  LoginInput,
  MutationChangePasswordArgs,
  MutationGoogleSignUpArgs,
  MutationLoginArgs,
  MutationSignupArgs,
  SendSmsVerificationCodeMutationVariables,
  SendTemporaryPasswordMutationVariables,
  SignUpInput,
  useChangePasswordMutation,
  useGoogleLoginMutation,
  useGoogleSignupMutation,
  useLoginMutation,
  useMeQuery,
  useSendSmsVerificationCodeMutation,
  useSendTemporaryPasswordMutation,
  useSignupMutation,
} from '@/generated/graphql';
// import { SendTemporaryPasswordResult } from '@/pages/auth/FindPassword';
import { PATH } from '@/router/routeList';
import { authTokenStorage } from '@/utils/auth-token';
import { GlobalEnv } from '@/utils/config';
import { graphQLClient } from '@/utils/graphql-client';

export const AuthContainer = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginStateAtom);
  const [isLoginStorage, setIsLoginStorage] = useRecoilState(IsLoginStorageAtom);
  // 로그인 할 때 일회성으로 지정되는 토큰
  const [token, setToken] = useRecoilState(LoginTokenAtom);
  // 소셜 회원가입 할 때 소셜쪽에서 제공하는 토큰
  const [idToken, setIdToken] = useRecoilState(SocialTokenAtom);
  // 임시 비밀번호로 로그인 한 여부
  const [isTemporaryPasswordLogin, setTemporaryPasswordLogin] = useRecoilState(
    IsTemporaryPasswordLoginAtom,
  );
  const [isSending, setSending] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // TODO 임시비밀번호 발급 오류 관리 필요함
  const [sendTemporaryPasswordResponseStatus, setSendTemporaryPasswordResponseStatus] =
    useState<number>(0);

  const handleChangeLoginState = (state: boolean) => {
    setIsLogin(state);
  };
  const clearLogin = () => {
    // 로그인 토크 상태 정리
    setToken(null);
    // 로그인 상태 해제
    handleChangeLoginState(false);
    // 세션, 로컬스토리지에 저장된 토큰 삭제
    authTokenStorage.clearToken();

    // 임시 비밀번호로 로그인한 상태 정리
    setTemporaryPasswordLogin(false);
    // 임시 비밀번호로 로그인한 세션 삭제
    sessionStorage.removeItem('TEMPORARY_PASSWORD_LOGIN');
  };
  const onLogout = () => {
    clearLogin();
    navigate(PATH.SIGN_IN);
  };

  // 회원정보 가져오기

  const {
    data: userInfo,
    isLoading: isLoadingUserInfo,
    refetch: refetchUserInfo,
  } = useMeQuery(
    graphQLClient,
    {},
    {
      onSuccess: (res) => {
        //SNS 회원가입
        const path = !res.me.phone && PATH.SIGN_UP_WITH_GOOGLE;

        if (path) {
          navigate(path, { state: { email: res.me.email } });
        }
      },
      onError: (error) => {
        if (error instanceof Error) {
          console.log(error, 'error : )');
          throw new Error(error.message, error);
        }
        // onLogout();
      },
      // refetchOnWindowFocus: false,
      enabled: false,
    },
  );

  // 인증번호 발송 시작
  const { mutate: sendSmsVerificationCodeMutate } = useSendSmsVerificationCodeMutation(
    graphQLClient,
    {
      onSuccess: () => {
        toast.success('발송 성공하였습니다.');
        setSending(true);
      },
      onError: () => {
        toast.error('발송 실패하였습니다.');
        setSending(false);
      },
    },
  );

  const onSendSmsVerifyCode = (
    sendSmsVerifyCode: SendSmsVerificationCodeMutationVariables,
  ) => sendSmsVerificationCodeMutate(sendSmsVerifyCode);

  // 회원가입 시작
  const { mutate: signUpMutate } = useSignupMutation(graphQLClient, {
    onSuccess: (res) => {
      if (res.signup.token) {
        setToken(res.signup.token);
        authTokenStorage.setToken(isLoginStorage, res.signup.token);
        navigate(PATH.SEARCH_PRODUCTS);
      }
    },
    onError: () => {
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
        verifyCodeSign: value.verifyCodeSign,
      },
    };
    signUpMutate(signupFormValue);
  };
  // 회원가입 끝

  // 소셜 회원가입 시작
  const { mutate: signUpSocialMutate } = useGoogleSignupMutation(graphQLClient, {
    onSuccess: (res) => {
      if (res.googleSignUp.token) {
        setIdToken('');
        setToken(res.googleSignUp.token);
        authTokenStorage.setToken(isLoginStorage, res.googleSignUp.token);
        navigate(PATH.SEARCH_PRODUCTS);
      }
    },
    onError: () => {
      toast.error('회원 가입 실패하였습니다. 입력값을 재확인 하십시오.');
    },
  });

  const onSubmitSignUpSocial = (value: GoogleSignUpInput) => {
    const signupSocialFormValue: MutationGoogleSignUpArgs = {
      socialSignUpDto: {
        idToken: value.idToken,
        phone: value.phone,
        verifyCodeSign: value.verifyCodeSign,
      },
    };
    signUpSocialMutate(signupSocialFormValue);
  };
  // 소셜 회원가입 끝

  // 로컬 로그인 시작
  const { mutate: loginMutate } = useLoginMutation(graphQLClient, {
    onSuccess: (res) => {
      // 로그인 토큰 설정
      setToken(res.login.token);
      authTokenStorage.setToken(isLoginStorage, res.login.token);
      // isLogin 상태 변경
      handleChangeLoginState(true);
      // 임시비밀번호로 로그인 한 경우
      if (res.login.popupInfo) {
        sessionStorage.setItem('TEMPORARY_PASSWORD_LOGIN', res.login.token);
        setTemporaryPasswordLogin(true);
        navigate(PATH.REAPPLY_PASSWORD);
      } else {
        setTemporaryPasswordLogin(false);
        navigate(PATH.SEARCH_PRODUCTS);
      }
    },
    onError: (err) => {
      const error = JSON.parse(JSON.stringify(err));
      console.error('로그인 실패 : ', error);
      toast.error('아이디 또는 패스워드를 다시 한 번 확인해주세요.');
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
  // 로컬 로그인 끝

  // 구글 로그인 시작
  const { mutate: googleLoginMutate } = useGoogleLoginMutation(graphQLClient, {
    onSuccess: (res) => {
      setToken(res.googleLogin.token);
      handleChangeLoginState(true);
      authTokenStorage.setToken(isLoginStorage, res.googleLogin.token);

      //검색페이지로 이동
      navigate(PATH.SEARCH_PRODUCTS);

      // await refetchUserInfo();
    },
    onError: (err) => {
      const error = JSON.parse(JSON.stringify(err));
      toast.error(error.response.errors[0].message);
    },
  });

  const onGoogleLoginButton = ({ idToken }: GoogleLoginMutationVariables) => {
    googleLoginMutate({ idToken });
  };
  const handleCredentialResponse = (response: CredentialResponse) => {
    if (response.credential) {
      setIdToken(response.credential);
      onGoogleLoginButton({ idToken: response.credential });
    }
  };
  // 구글 로그인 끝

  // 비밀번호 변경
  const { mutate: changePassword } = useChangePasswordMutation(graphQLClient, {
    onSuccess: () => {
      toast.success(
        '변경 성공하였습니다. 다음번 방문부터는 변경된 비밀번호를 사용해주세요!',
      );
      navigate(PATH.SEARCH_PRODUCTS);
    },
    onError: () => {
      toast.error('변경 실패하였습니다.');
    },
  });

  const onChangePassword = (value: ChangePasswordInput) => {
    if (!userInfo?.me) {
      return false;
    }

    const onChangePasswordValue: MutationChangePasswordArgs = {
      pwd: {
        email: userInfo?.me.email,
        newPassword: value.newPassword,
      },
    };
    return changePassword(onChangePasswordValue);
  };
  // 비밀번호 변경

  // 유저 임시 비밀번호 발급 시작
  const { mutate: sendTemporaryPassword, isSuccess: isSuccessSendTemporaryPassword } =
    useSendTemporaryPasswordMutation(graphQLClient, {
      onSuccess: () => {
        toast.success('신규 비밀번호 발송 성공하였습니다.');
      },
      onError: (err) => {
        const error = JSON.parse(JSON.stringify(err));
        setSendTemporaryPasswordResponseStatus(
          error.response.errors[0].extensions.exception.status,
        );
      },
    });

  const onSendTemporaryPassword = (variables: SendTemporaryPasswordMutationVariables) =>
    sendTemporaryPassword(variables);
  // 유저 임시 비밀번호 발급 끝

  useEffect(() => {
    if (token) {
      graphQLClient.setHeader('authorization', `bearer ${token}`);
      refetchUserInfo();
    }
  }, []);

  useEffect(() => {
    // 로그인한 상태인지 확인
    const storageToken = authTokenStorage.getToken();
    if (storageToken) {
      // 가져온 토큰 셋팅
      setToken(storageToken);

      // 로그인 상태 변경
      handleChangeLoginState(true);

      // 임시 비밀번호를 사용한 로그인 건인지 확인
      const temporaryPasswordLoginSession = sessionStorage.getItem(
        'TEMPORARY_PASSWORD_LOGIN',
      );
      if (temporaryPasswordLoginSession) {
        setTemporaryPasswordLogin(true);
      }
    } else {
      // 비회원인 경우
      handleChangeLoginState(false);
      if (
        !Object.values(PATH).find((d) => d === pathname) &&
        !pathname.startsWith(PATH.SIGN_IN)
      ) {
        navigate(PATH.SIGN_IN);
      }

      clearLogin();
    }

    window.google?.accounts.id.initialize({
      client_id: GlobalEnv.viteGoogleClientId,
      callback: handleCredentialResponse,
    });

    if (pathname === PATH.SIGN_IN) {
      window.google?.accounts.id.renderButton(
        document.getElementById('google-login-button') as HTMLElement,
        {
          type: 'standard',
          theme: 'outline',
          text: 'signin_with',
          width: '416px',
          shape: 'square',
        },
      );
    }
  }, []);

  return {
    onSendSmsVerifyCode,
    onSubmitSignUp,
    onSubmitSignIn,
    onSubmitSignUpSocial,
    onLogout,
    onGoogleLoginButton,
    isLoginStorage,
    setIsLoginStorage,
    isLogin,
    userInfo,
    isLoadingUserInfo,
    token,
    // 비밀번호 변경
    onChangePassword,
    // 유저 임시 비밀번호 발급
    onSendTemporaryPassword,
    isSuccessSendTemporaryPassword,
    sendTemporaryPasswordResponseStatus,
    // 임시 비밀번호를 사용한 로그인 여부
    isTemporaryPasswordLogin,
    setIdToken,
    idToken,
    isSending,
    setSending,
  };
};
