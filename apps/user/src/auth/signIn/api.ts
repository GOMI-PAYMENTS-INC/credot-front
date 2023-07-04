import { useNavigate } from 'react-router-dom';

import {
  ChangePasswordInput,
  GoogleLoginMutationVariables,
  MutationChangePasswordArgs,
  useChangePasswordMutation,
  useGoogleLoginMutation,
  useLoginMutation,
} from '@/generated/graphql';
import { CACHING_KEY } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';

import { useCookieStorage } from '@/utils/useCookieStorage';
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
import { PATH } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { authReturnUrl } from '@/auth/container';
//TODO: 분리시키기
export const signInApi = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const clearUserAtom = useResetRecoilState(UserAtom);
  const clearLoginTokenAtom = useResetRecoilState(LoginTokenAtom);
  const userInfo = useRecoilValue(UserAtom);

  const { moveToMain } = authReturnUrl();

  // 로컬 로그인
  const { mutate: loginMutate } = useLoginMutation({
    onSuccess: (res) => {
      authTokenStorage.setToken(res.login.token);
      // 임시비밀번호로 로그인 한 경우
      if (res.login.popupInfo) {
        useCookieStorage.setCookie(
          CACHING_KEY.TEMPORARY_PASSWORD_LOGIN,
          res.login.token,
          1,
        );
        navigation(PATH.REAPPLY_PASSWORD);

        _amplitudeLoggedIn(AMPLITUDE_ACCOUNT_TYPE.LOCAL);
      } else {
        useCookieStorage.getCookie(CACHING_KEY.TEMPORARY_PASSWORD_LOGIN) &&
          useCookieStorage.removeCookie(CACHING_KEY.TEMPORARY_PASSWORD_LOGIN);

        moveToMain();
      }
    },
    onError: (err) => {},
  });

  // 구글 로그인/회원가입 시도
  const { mutate: googleLoginMutate } = useGoogleLoginMutation({
    onSuccess: (res, variables) => {
      //구글 회원가입
      if (isFalsy(res.googleLogin.isPhoneNumber)) {
        navigation(PATH.SIGN_UP_WITH_GOOGLE, {
          state: { token: variables.idToken },
        });
        return;
      }

      //구글 로그인
      authTokenStorage.setToken(res.googleLogin.token);
      moveToMain();
      _amplitudeLoggedIn(AMPLITUDE_ACCOUNT_TYPE.GOOGLE);
    },
    onError: (err) => {
      const error = JSON.parse(JSON.stringify(err));
      toast.error(error.response.errors[0].message);
    },
  });

  const _googleLoginMutate = ({ idToken }: GoogleLoginMutationVariables) => {
    googleLoginMutate({ idToken });
  };
  // 구글 로그인 끝

  const clearUserInfo = () => {
    // auth에서 사용중인 recoil 초기화
    clearUserAtom();
    clearLoginTokenAtom();

    // 쿠키 삭제
    authTokenStorage.clearToken();
    useCookieStorage.getCookie(CACHING_KEY.TEMPORARY_PASSWORD_LOGIN) &&
      useCookieStorage.removeCookie(CACHING_KEY.TEMPORARY_PASSWORD_LOGIN);
    useCookieStorage.removeCookie('AMPLITUDE_USER_ID');

    // 세션 전체 삭제
    useSessionStorage.initializeItems();

    // react query 초기화
    queryClient.clear();
  };

  const clearAmplitude = () => {
    //앰플리튜드 회원 셋팅 여부 초기화
    useCookieStorage.removeCookie('AMPLITUDE_USER_ID');

    //앰플리튜드 디바이스 ID초기화
    useCookieStorage.removeCookie('AMPLITUDE_DEVICE_ID');

    //앰플리튜드 초기화
    _resetAmplitude();
  };

  const onLogout = async () => {
    clearUserInfo();
    navigation(PATH.SIGN_IN);

    // ##### 로그아웃 이벤트 시작 ##### //
    //앰플리튜드 - 로그아웃 이벤트
    await _amplitudeLoggedOut(() => {
      clearAmplitude();
    });
    // ##### 로그아웃이벤트 끝 ##### //
  };

  // 비밀번호 변경
  const { mutate: changePassword } = useChangePasswordMutation({
    onSuccess: () => {
      toast.success('비밀번호가 정상적으로 변경되었어요.');
      moveToMain();

      _amplitudeChangePwCompleted();
    },
    onError: () => {
      toast.error('변경 실패하였습니다.');
    },
  });
  const _changePassword = (value: ChangePasswordInput) => {
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
    clearAmplitude,
    _googleLoginMutate,
    clearUserInfo,
    onLogout,
    _changePassword,
  };
};
