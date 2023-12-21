import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';

import { UserAtom, UserCardsAtom, UserPlanAtom } from '@/atom';
import { AuthService, UserDto, UserService } from '@/generated-rest/api/front';
import { ApiError } from '@/generated-rest/api/front/core/ApiError';
import { OpenAPI } from '@/generated-rest/api/front/core/OpenAPI';
import { CACHING_KEY, PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { isTruthy } from '@/utils/isTruthy';
import { useCookieStorage } from '@/utils/useCookieStorage';
import { useSessionStorage } from '@/utils/useSessionStorage';

export const useMeHook = (token: string | null) => {
  const { clearUserInfo } = useClearUserInfo();
  const navigation = useNavigate();
  return useQuery<UserDto, ApiError>({
    queryKey: ['profile', token],
    queryFn: () => AuthService.getProfile(),
    enabled: isTruthy(token),
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      const userId = res.id;
      if (isFalsy(useCookieStorage.getCookie('AMPLITUDE_USER_ID'))) {
        //앰플리튜드에서 사용할 회원 정보 셋팅
        useCookieStorage.setCookie('AMPLITUDE_USER_ID', 'true', 1);
      }
    },
    onError: () => {
      clearUserInfo();
      navigation(PATH.SIGN_IN);
    },
  });
};

export const useUserListHook = (userId: string | null) => {
  return useQuery<UserDto[], ApiError>({
    queryKey: ['userList', userId],
    queryFn: () => UserService.getUsers(userId || ''),
  });
};

export const useUserById = (userId: number | null) => {
  return useQuery<UserDto, ApiError>({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUser(Number(userId)),
    enabled: !!userId,
  });
};

export const useLogout = () => {
  const { clearUserInfo } = useClearUserInfo();
  const navigation = useNavigate();

  const logout = () => {
    clearUserInfo();
    navigation(PATH.SIGN_IN);
  };

  return {
    logout,
  };
};

const useClearUserInfo = () => {
  const queryClient = useQueryClient();
  const clearUserAtom = useResetRecoilState(UserAtom);
  const userCardAtom = useResetRecoilState(UserCardsAtom);
  const userPlanAtom = useResetRecoilState(UserPlanAtom);

  // auth에서 사용중인 recoil 초기화
  const clearUserInfo = () => {
    clearUserAtom();
    userCardAtom();
    userPlanAtom();

    // 쿠키 삭제
    authTokenStorage.clearToken();
    if (useCookieStorage.getCookie(CACHING_KEY.TEMPORARY_PASSWORD_LOGIN)) {
      useCookieStorage.removeCookie(CACHING_KEY.TEMPORARY_PASSWORD_LOGIN);
    }
    //앰플리튜드 회원 셋팅 여부 초기화
    useCookieStorage.removeCookie('AMPLITUDE_USER_ID');
    //앰플리튜드 디바이스 ID초기화
    useCookieStorage.removeCookie('AMPLITUDE_DEVICE_ID');
    OpenAPI.TOKEN = '';

    // 세션 전체 삭제
    useSessionStorage.initializeItems();

    // react query 초기화
    queryClient.clear();
  };

  return {
    clearUserInfo,
  };
};
