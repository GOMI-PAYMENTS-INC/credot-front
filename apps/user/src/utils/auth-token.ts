import { GlobalEnv } from '@/utils/config';
// 로그인 토큰 관리
export const authTokenStorage = {
  getToken: () => {
    if (!GlobalEnv.tokenKey) return null;
    const token = localStorage.getItem(GlobalEnv.tokenKey)
      ? localStorage.getItem(GlobalEnv.tokenKey)
      : sessionStorage.getItem(GlobalEnv.tokenKey);
    return token || null;
  },
  setToken: (isLoginStorage: boolean, token: string): void => {
    if (!GlobalEnv.tokenKey) return;
    if (isLoginStorage) {
      localStorage.setItem(GlobalEnv.tokenKey, token);
    } else {
      sessionStorage.setItem(GlobalEnv.tokenKey, token);
    }
  },
  clearToken: (): void => {
    if (!GlobalEnv.tokenKey) return;
    if (localStorage.getItem(GlobalEnv.tokenKey)) {
      localStorage.removeItem(GlobalEnv.tokenKey);
    } else {
      sessionStorage.removeItem(GlobalEnv.tokenKey);
    }
  },
};
