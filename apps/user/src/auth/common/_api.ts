import { CACHING_KEY } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';

import { useCookieStorage } from '@/utils/useCookieStorage';
import {
  _amplitudeChangePwCompleted,
  _amplitudeLoggedIn,
  _amplitudeLoggedOut,
  _resetAmplitude,
} from '@/amplitude/amplitude.service';
import { useResetRecoilState } from 'recoil';
import { LoginTokenAtom, UserAtom } from '@/atom/auth/auth-atom';
import { useQueryClient } from '@tanstack/react-query';

import { useSessionStorage } from '@/utils/useSessionStorage';

const clearUserInfo = () => {
  const clearUserAtom = useResetRecoilState(UserAtom);
  const clearLoginTokenAtom = useResetRecoilState(LoginTokenAtom);
  // auth에서 사용중인 recoil 초기화
  clearUserAtom();
  clearLoginTokenAtom();
  const queryClient = useQueryClient();
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

export const logOut = async (callback: Function) => {
  clearUserInfo();
  callback();

  // ##### 로그아웃 이벤트 시작 ##### //
  //앰플리튜드 - 로그아웃 이벤트
  await _amplitudeLoggedOut(() => {
    clearAmplitude();
  });
  // ##### 로그아웃이벤트 끝 ##### //
};
