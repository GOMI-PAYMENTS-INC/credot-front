import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { authReturnUrl } from '@/auth/container';

export default function PrivateRoute() {
  const storageToken = authTokenStorage.getToken();

  const { saveReturnUrl } = authReturnUrl();

  if (isFalsy(storageToken)) {
    saveReturnUrl(window.location.href);
    return <Navigate to={PATH.SIGN_IN} />;
  }

  return <Outlet />;
}
