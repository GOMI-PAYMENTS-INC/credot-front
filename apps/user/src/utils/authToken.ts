import { GlobalEnv } from '@/api/config';
// 로그인 토큰 관리
export const authTokenStorage = {
  getToken: (): string | null => {
    if (GlobalEnv.tokenKey === false) return null;
    const token = localStorage.getItem(GlobalEnv.tokenKey)
      ? localStorage.getItem(GlobalEnv.tokenKey)
      : sessionStorage.getItem(GlobalEnv.tokenKey);
    return token || null;
  },
  setToken: (isLoginStorage: boolean, token: string): void => {
    if (GlobalEnv.tokenKey === false) return;
    if (isLoginStorage) {
      localStorage.setItem(GlobalEnv.tokenKey, token);
    } else {
      sessionStorage.setItem(GlobalEnv.tokenKey, token);
    }
  },
  clearToken: (): void => {
    if (GlobalEnv.tokenKey === false) return;
    if (localStorage.getItem(GlobalEnv.tokenKey)) {
      localStorage.removeItem(GlobalEnv.tokenKey);
    } else {
      sessionStorage.removeItem(GlobalEnv.tokenKey);
    }
  },
};
