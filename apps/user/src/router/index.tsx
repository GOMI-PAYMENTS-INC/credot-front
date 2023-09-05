import { createElement, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { _setUserId } from '@/amplitude/amplitude.service';
import { LoginTokenAtom, UserAtom } from '@/atom/auth/auth-atom';
import { signInApi } from '@/auth/signIn/api';
import { useMeQuery } from '@/generated/graphql';
import PrivateRoute from '@/router/PrivateRouter';
import { routeList } from '@/router/routeList';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';

import { isFalsy } from '@/utils/isFalsy';
import { useCookieStorage } from '@/utils/useCookieStorage';

import { isTruthy } from '@/utils/isTruthy';

export const Router = () => {
  // 인증이 반드시 필요한 페이지
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);
  const setToken = useSetRecoilState(LoginTokenAtom);

  const { hackleClient } = window;
  const storageToken = authTokenStorage.getToken();

  //FIXME: signInAPI 분리하기
  const { clearUserInfo, clearAmplitude } = signInApi();
  const navigation = useNavigate();

  const { data: userQueryData } = useMeQuery(
    { token: storageToken },
    {
      enabled: isTruthy(storageToken),
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const userId = res.me.id;
        if (isFalsy(useCookieStorage.getCookie('AMPLITUDE_USER_ID'))) {
          //앰플리튜드에서 사용할 회원 정보 셋팅
          _setUserId(userId);
          useCookieStorage.setCookie('AMPLITUDE_USER_ID', 'true', 1);
        }
      },
      onError: () => {
        clearUserInfo();
        clearAmplitude();
        navigation(PATH.SIGN_IN);
      },
    },
  );

  useEffect(() => {
    if (isFalsy(userInfo)) {
      setToken(storageToken);
      setUserInfo(userQueryData);
    }
  }, [userQueryData?.me.id]);

  return (
    <Routes>
      {routeList.map((route) => {
        return route.isPrivate ? (
          <Route key={route.path} element={<PrivateRoute />}>
            <Route
              key={route.path}
              path={route.path}
              element={createElement(route.component)}
            />
          </Route>
        ) : (
          <Route
            key={route.description}
            path={route.path}
            element={createElement(route.component)}
          />
        );
      })}
    </Routes>
  );
};
