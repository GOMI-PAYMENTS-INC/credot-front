
import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';
import {authTokenStorage} from "@/utils/authToken";

export default function PrivateRoute() {
  const storageToken = authTokenStorage.getToken();

  // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
  return isFalsy(storageToken) ? <Navigate to={PATH.SIGN_IN} /> : <Outlet />;
}
