import { GlobalEnv } from '@/api/config';
import { removeCookie, getCookie, setCookie } from '@/utils/cookie';

// 로그인 토큰 관리
export const authTokenStorage = {
  getToken: () => {
    if (GlobalEnv.tokenKey === false) return null;
    const token = getCookie(GlobalEnv.tokenKey);
    return token || null;
  },
  setToken: (token: string): void => {
    if (GlobalEnv.tokenKey === false) return;
    setCookie(GlobalEnv.tokenKey, token, 1);
  },
  clearToken: (): void => {
    if (GlobalEnv.tokenKey === false) return;
    removeCookie(GlobalEnv.tokenKey);
  },
};
