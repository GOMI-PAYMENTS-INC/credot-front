import { useMutation } from '@tanstack/react-query';

import { authReturnUrl } from '@/auth/container';
import { AuthService, LoginDto } from '@/generated-rest/api/front';
import { CACHING_KEY, PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { useCookieStorage } from '@/utils/useCookieStorage';

export const useLoginHook = () => {
  const { moveToMain } = authReturnUrl();

  return useMutation((requestBody: LoginDto) => AuthService.login(requestBody), {
    onSuccess: (_) => {
      authTokenStorage.setToken(_.accessToken);
      if (useCookieStorage.getCookie(CACHING_KEY.TEMPORARY_PASSWORD_LOGIN)) {
        useCookieStorage.removeCookie(CACHING_KEY.TEMPORARY_PASSWORD_LOGIN);
      }

      moveToMain();
    },
    onError: () => {},
  });
};
