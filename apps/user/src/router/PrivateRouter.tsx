import { Navigate, Outlet } from 'react-router-dom';

import { signInApi } from '@/containers/auth/signIn.api';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { authReturnUrl } from '@/containers/auth/auth.container';

export default function PrivateRoute() {
  const storageToken = authTokenStorage.getToken();

  const { saveReturnUrl } = authReturnUrl();

  // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
  if (isFalsy(storageToken)) {
    saveReturnUrl(window.location.href);
    return <Navigate to={PATH.SIGN_IN} />;
  } else {
    return <Outlet />;
  }
}
