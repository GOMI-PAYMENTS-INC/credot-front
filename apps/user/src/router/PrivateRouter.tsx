import { Navigate, Outlet } from 'react-router-dom';

import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';

export default function PrivateRoute() {
  const isAuthenticated = authTokenStorage.getToken();

  // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
  return isFalsy(isAuthenticated) ? <Navigate to={PATH.SIGN_IN} /> : <Outlet />;
}
