import { createElement, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

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
import { useVariation } from '@hackler/react-sdk';
import { HackleId } from '@/atom/common/hackle.atom';

export const Router = () => {
  // 인증이 반드시 필요한 페이지
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);
  const [token, setToken] = useRecoilState(LoginTokenAtom);
  const [_hackleId, _setHackleId] = useRecoilState(HackleId);
  const hackleId = useVariation(9);

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
        if (isFalsy(useCookieStorage.getCookie('AMPLITUDE_USER_ID'))) {
          //앰플리튜드에서 사용할 회원 정보 셋팅
          _setUserId(res.me.id);
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
    if (isFalsy(_hackleId)) {
      // _setHackleId(hackleId as THackleId);
      _setHackleId('A');
    }

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
