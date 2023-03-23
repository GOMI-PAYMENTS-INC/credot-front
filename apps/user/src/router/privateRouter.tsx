import { Navigate, Outlet } from 'react-router-dom';

import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';

export default function PrivateRoute() {
  const isAuthenticated = authTokenStorage.getToken();

  // 인증이 반드시 필요한 페이지

  // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
  return isAuthenticated === null || isAuthenticated === 'false' ? (
    <Navigate to={PATH.SIGN_IN} />
  ) : (
    <Outlet />
  );
}
