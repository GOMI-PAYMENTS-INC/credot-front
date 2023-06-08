import {createElement, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import PrivateRoute from '@/router/PrivateRouter';
import { routeList } from '@/router/routeList';
import {LoginTokenAtom, UserAtom} from "@/atom/auth/auth-atom";
import {AuthCommonContainer} from "@/containers/auth/auth.common.container";
import {useMeQuery} from "@/generated/graphql";
import {graphQLClient} from "@/utils/graphqlCient";
import {isFalsy} from "@/utils/isFalsy";
import {PATH} from "@/types/enum.code";
import {useCookieStorage} from "@/utils/useCookieStorage";
import {_setUserId} from "@/amplitude/amplitude.service";
import {authTokenStorage} from "@/utils/authToken";
import {useRecoilState} from "recoil";
export const Router = () => {

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

  return (
    <Routes>
      {routeList.map((route) => {
        if (route.isPrivate) {
          return (
            <Route key={route.path} element={<PrivateRoute />}>
              {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
              <Route
                key={route.path}
                path={route.path}
                element={createElement(route.component)}
              />
            </Route>
          );
        }

        return (
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
