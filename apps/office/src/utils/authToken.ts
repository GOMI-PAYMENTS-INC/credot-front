import { GlobalEnv } from '@/api/config';
import { useCookieStorage } from '@/utils/useCookieStorage';

// 로그인 토큰 관리
export const authTokenStorage = {
  getToken: () => {
    if (GlobalEnv.tokenKey === false) return null;
    const token = useCookieStorage.getCookie(GlobalEnv.tokenKey);
    return token || null;
  },
  setToken: (token: string): void => {
    if (GlobalEnv.tokenKey === false) return;
    useCookieStorage.setCookie(GlobalEnv.tokenKey, token, 1);
  },
  clearToken: (): void => {
    if (GlobalEnv.tokenKey === false) return;
    useCookieStorage.removeCookie(GlobalEnv.tokenKey);
  },
};
