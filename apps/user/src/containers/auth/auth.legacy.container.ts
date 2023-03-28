import { SetStateAction, useEffect, useMemo, useState, Dispatch } from 'react';
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
  MutationChangePasswordArgs,
  MutationGoogleSignUpArgs,
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

import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { GlobalEnv } from '@/api/config';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { graphQLClient } from '@/utils/graphqlCient';
import {
  _generalLoggedIn,
  _generalLoggedOut,
  _signupSignupCompleted,
  _resetAmplitude,
  _setUserProperties,
  _findPwChangePwStarted,
  _findPwChangePwCompleted,
} from '@/amplitude/amplitude.service';
import { isFalsy } from '@/utils/isFalsy';
import { getCookie, removeCookie, setCookie } from '@/utils/cookie';
import { AccountType } from '@/amplitude/amplitude.enum';

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
  const [fromSocialSignUp, setFromSocialSignUp] = useState<boolean>(false);

  const { pathname } = useLocation();
  const navigation = useNavigate();

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

    useSessionStorage.removeItem('keyword');

    // 임시 비밀번호로 로그인한 상태 정리
    setTemporaryPasswordLogin(false);

    // 임시 비밀번호로 로그인한 쿠키 삭제
    removeCookie('TEMPORARY_PASSWORD_LOGIN');

    //userInfo react query 초기화
    removeUserInfo();
  };

  const clearAmplitude = () => {
    //앰플리튜드 회원 셋팅 여부 초기화
    removeCookie('SET_EVENT_USER_PROPERTIES');

    //앰플리튜드 디바이스 ID초기화
    removeCookie('AMPLITUDE_DEVICE_ID');

    //앰플리튜드 초기화
    _resetAmplitude();
  };

  const onLogout = async () => {
    // ##### 로그아웃 이벤트 시작 ##### //
    clearLogin();

    navigation(PATH.SIGN_IN);

    //앰플리튜드 - 로그아웃 이벤트
    await _generalLoggedOut(() => {
      clearAmplitude();
    });
    // ##### 로그아웃이벤트 끝 ##### //
  };

  // 회원정보 가져오기
  const {
    data: userInfo,
    isLoading: isLoadingUserInfo,
    refetch: refetchUserInfo,
    remove: removeUserInfo,
  } = useMeQuery(
    graphQLClient,
    {},
    {
      onSuccess: async (res) => {
        if (isFalsy(getCookie('SET_EVENT_USER_PROPERTIES'))) {
          //앰플리튜드에서 사용할 회원 정보 셋팅
          const result = await _setUserProperties(res.me);
          if (result) {
            setCookie('SET_EVENT_USER_PROPERTIES', 'true', 1);
          }
        }
      },
      onError: (error) => {
        if (error instanceof Error) {
          console.error(error, 'error : )');
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
        setSending(true);
      },
      onError: () => {
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
        authTokenStorage.setToken(res.signup.token);
        navigation(PATH.SEARCH_PRODUCTS);
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
    signUpMutate(signupFormValue, {
      onSuccess: () => {
        //회원가입 완료 시 이벤트 - 로컬
        void _signupSignupCompleted(
          AccountType.LOCAL,
          signupFormValue.user.email,
          signupFormValue.user.phone,
        );
        navigation(PATH.SEARCH_PRODUCTS);
      },
    });
  };
  // 회원가입 끝

  // 소셜 회원가입 시작
  const { mutate: signUpSocialMutate } = useGoogleSignupMutation(graphQLClient, {
    onError: () => {
      toast.error('회원 가입 실패하였습니다. 입력값을 재확인 하십시오.');
    },
  });

  const onSubmitSignUpSocial = (
    value: GoogleSignUpInput,
    email: string,
    setWelcomeModalClosingTime: Dispatch<SetStateAction<number | null>>,
  ) => {
    const signupSocialFormValue: MutationGoogleSignUpArgs = {
      socialSignUpDto: {
        idToken: value.idToken,
        phone: value.phone,
        verifyCodeSign: value.verifyCodeSign,
      },
    };
    signUpSocialMutate(signupSocialFormValue, {
      //회원가입 완료 시 이벤트 - 구글 로그인
      onSuccess: (res) => {
        setWelcomeModalClosingTime(1500);
        setFromSocialSignUp(true);
        if (res.googleSignUp.token) {
          setToken(res.googleSignUp.token);
          authTokenStorage.setToken(res.googleSignUp.token);
        }
        void _signupSignupCompleted(
          AccountType.LOCAL,
          email,
          signupSocialFormValue.socialSignUpDto.phone,
        );
      },
    });
  };
  // 소셜 회원가입 끝

  // 로컬 로그인 시작
  const { mutate: loginMutate } = useLoginMutation(graphQLClient, {
    onSuccess: (res) => {
      // 로그인 토큰 설정
      setToken(res.login.token);
      authTokenStorage.setToken(res.login.token);
      // isLogin 상태 변경
      handleChangeLoginState(true);
      // 임시비밀번호로 로그인 한 경우
      if (res.login.popupInfo) {
        setCookie('TEMPORARY_PASSWORD_LOGIN', res.login.token, 1);
        setTemporaryPasswordLogin(true);
        navigation(PATH.REAPPLY_PASSWORD);
      } else {
        setTemporaryPasswordLogin(false);
        navigation(PATH.SEARCH_PRODUCTS);
      }
    },
    onError: (err) => {},
  });
  // 로컬 로그인 끝

  // 구글 로그인 시작 /
  const { mutate: googleLoginMutate } = useGoogleLoginMutation(graphQLClient, {
    onSuccess: (res) => {
      setToken(res.googleLogin.token);
      authTokenStorage.setToken(res.googleLogin.token);
    },
    onError: (err) => {
      const error = JSON.parse(JSON.stringify(err));
      toast.error(error.response.errors[0].message);
    },
  });

  const onGoogleLoginButton = ({ idToken }: GoogleLoginMutationVariables) => {
    googleLoginMutate(
      { idToken },
      {
        onSuccess: () => {
          //로그인 완료 시 - 구글 로그인
          _generalLoggedIn(AccountType.GOOGLE);
        },
      },
    );
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
      toast.success('비밀번호가 정상적으로 변경되었어요.');
      navigation(PATH.SEARCH_PRODUCTS);

      //앰플리튜드 이벤트 - 비밀번호 재설정 완료 시
      _findPwChangePwCompleted();
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

  useMemo(() => {
    if (token) {
      graphQLClient.setHeader('authorization', `bearer ${token}`);

      refetchUserInfo().then((value) => {
        //토큰은 있지만 로그인 상태가 아닌 경우
        if (isLogin === false) {
          //소셜 회원가입인 경우 전화번호 인증이 필요함
          const path = value.data?.me.phone === '' && PATH.SIGN_UP_WITH_GOOGLE;

          if (path) {
            clearLogin();
            clearAmplitude();
            navigation(path, { state: { email: value.data?.me.email, token: idToken } });
          } else {
            handleChangeLoginState(true);
            navigation(PATH.SEARCH_PRODUCTS);
          }
        }
      });
    }
  }, [token]);

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
    loginMutate,
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
