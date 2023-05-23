import { useNavigate } from 'react-router-dom';

import {
  ChangePasswordInput,
  GoogleLoginMutationVariables,
  MutationChangePasswordArgs,
  useChangePasswordMutation,
  useGoogleLoginMutation,
  useLoginMutation,
} from '@/generated/graphql';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { graphQLClient } from '@/utils/graphqlCient';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { removeCookie } from '@/utils/cookie';
import {
  _amplitudeChangePwCompleted,
  _amplitudeLoggedIn,
  _amplitudeLoggedOut,
  _resetAmplitude,
} from '@/amplitude/amplitude.service';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { LoginTokenAtom, UserAtom } from '@/atom/auth/auth-atom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AMPLITUDE_ACCOUNT_TYPE } from '@/amplitude/amplitude.enum';

export const AuthCommonContainer = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const clearUserAtom = useResetRecoilState(UserAtom);
  const clearLoginTokenAtom = useResetRecoilState(LoginTokenAtom);
  const userInfo = useRecoilValue(UserAtom);

  // 로컬 로그인 시작
  const { mutate: loginMutate } = useLoginMutation(graphQLClient().config, {
    onSuccess: (res) => {
      authTokenStorage.setToken(res.login.token);
      // 임시비밀번호로 로그인 한 경우
      if (res.login.popupInfo) {
        navigation(PATH.REAPPLY_PASSWORD);
      } else {
        navigation(PATH.SEARCH_PRODUCTS);
      }
    },
    onError: (err) => {},
  });

  // 구글 로그인 시작 /
  const { mutate: googleLoginMutate } = useGoogleLoginMutation(graphQLClient().config, {
    onSuccess: (res) => {
      authTokenStorage.setToken(res.googleLogin.token);
      //로그인 완료 시 - 구글 로그인
      _amplitudeLoggedIn(AMPLITUDE_ACCOUNT_TYPE.GOOGLE);
    },
    onError: (err) => {
      const error = JSON.parse(JSON.stringify(err));
      toast.error(error.response.errors[0].message);
    },
  });
  const onCLickGoogleLoginButton = ({ idToken }: GoogleLoginMutationVariables) => {
    googleLoginMutate({ idToken });
  };
  // 구글 로그인 끝

  const clearLogin = () => {
    //auth에서 사용중인 recoil 초기화
    clearUserAtom();
    clearLoginTokenAtom();

    // 세션, 로컬스토리지에 저장된 토큰 삭제
    authTokenStorage.clearToken();
    useSessionStorage.initializeItems();

    //react query 초기화
    queryClient.clear();
  };

  const clearAmplitude = () => {
    //앰플리튜드 회원 셋팅 여부 초기화
    removeCookie('SET_EVENT_USER_ID');

    //앰플리튜드 디바이스 ID초기화
    removeCookie('AMPLITUDE_DEVICE_ID');

    //앰플리튜드 초기화
    _resetAmplitude();
  };

  const onLogout = async () => {
    clearLogin();
    navigation(PATH.SIGN_IN);

    // ##### 로그아웃 이벤트 시작 ##### //
    //앰플리튜드 - 로그아웃 이벤트
    await _amplitudeLoggedOut(() => {
      clearAmplitude();
    });
    // ##### 로그아웃이벤트 끝 ##### //
  };

  // 비밀번호 변경
  const { mutate: changePassword } = useChangePasswordMutation(graphQLClient().config, {
    onSuccess: () => {
      toast.success('비밀번호가 정상적으로 변경되었어요.');
      navigation(PATH.SEARCH_PRODUCTS);

      _amplitudeChangePwCompleted();
    },
    onError: () => {
      toast.error('변경 실패하였습니다.');
    },
  });
  const onChangePassword = (value: ChangePasswordInput) => {
    if (userInfo) {
      const onChangePasswordValue: MutationChangePasswordArgs = {
        pwd: {
          email: userInfo.me.email,
          newPassword: value.newPassword,
        },
      };
      return changePassword(onChangePasswordValue);
    }
  };

  return {
    loginMutate,
    onClickGoogleLoginButton: onCLickGoogleLoginButton,
    clearLogin,
    onLogout,
    onChangePassword,
  };
};

// 비밀번호 변경
