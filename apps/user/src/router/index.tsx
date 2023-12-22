import { createElement, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { UserAtom } from '@/atom';
import { OpenAPI } from '@/generated-rest/api/front/core/OpenAPI';
import { useMeHook } from '@/hooks/user.hook';
import PrivateRoute from '@/router/PrivateRouter';
import { routeList } from '@/router/routeList';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';

export const Router = () => {
  // 인증이 반드시 필요한 페이지
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);

  const storageToken = authTokenStorage.getToken();
  OpenAPI.TOKEN = typeof storageToken === 'string' ? storageToken : undefined;

  const { data: userQueryData } = useMeHook(storageToken);

  useEffect(() => {
    if (isFalsy(userInfo) && userQueryData) {
      setUserInfo({
        me: {
          id: userQueryData.id,
          name: userQueryData.name,
          email: userQueryData.email,
        },
      });
    }
  }, [userQueryData?.id]);

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
