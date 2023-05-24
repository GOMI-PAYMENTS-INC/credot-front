import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { _setUserId } from '@/amplitude/amplitude.service';
import { LoginTokenAtom, UserAtom } from '@/atom/auth/auth-atom';
import { useMeQuery } from '@/generated/graphql';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { useCookieStorage } from '@/utils/useCookieStorage';
import { isFalsy } from '@/utils/isFalsy';
import { graphQLClient } from '@/utils/graphqlCient';
import { AuthCommonContainer } from '@/containers/auth/auth.common.container';

export default function PrivateRoute() {
  // 인증이 반드시 필요한 페이지
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);
  const [token, setToken] = useRecoilState(LoginTokenAtom);

  const { clearUserInfo, clearAmplitude } = AuthCommonContainer();
  const navigation = useNavigate();

  const { data: userQueryData } = useMeQuery(
    graphQLClient().config,
    {},
    {
      enabled: isFalsy(token) === false,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        if (res.me.phone === '') {
          clearUserInfo();
          // clearAmplitude();
          navigation(PATH.SIGN_UP_WITH_GOOGLE, {
            state: { email: res.me.email, token: token },
          });
        }

        if (isFalsy(useCookieStorage.getCookie('AMPLITUDE_USER_ID'))) {
          //앰플리튜드에서 사용할 회원 정보 셋팅
          _setUserId(res.me.id);
          useCookieStorage.setCookie('AMPLITUDE_USER_ID', 'true', 1);
        }
      },
      onError: (error) => {
        clearUserInfo();
        clearAmplitude();
        navigation(PATH.SIGN_IN);
      },
    },
  );
  console.log('ddd');

  const storageToken = authTokenStorage.getToken();

  useEffect(() => {
    if (storageToken && isFalsy(token)) {
      setToken(storageToken);
    }
  }, [storageToken]);

  useEffect(() => {
    if (userQueryData && isFalsy(userInfo)) {
      setUserInfo(userQueryData);
    }
  }, [userQueryData]);

  // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로
  return isFalsy(storageToken) ? <Navigate to={PATH.SIGN_IN} /> : <Outlet />;
}
