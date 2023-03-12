import { createElement, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, matchRoutes } from 'react-router-dom';
import { PATH, routeList } from '@/router/routeList';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { isIncluded } from '@/utils/isIncluded';

export const Router = () => {
  const { pathname } = useLocation();

  const [{ route }] = matchRoutes(routeList, pathname) || [];

  const navigation = useNavigate();
  const isLogin = authTokenStorage.getToken() !== null;

  useEffect((): void => {
    if (
      isFalsy(isLogin) &&
      isIncluded(
        route.path,
        PATH.SEARCH_PRODUCTS,
        PATH.GET_REPORT_LIST,
        PATH.ANALYSIS_REPORT_LIST,
      )
    ) {
      navigation(PATH.SIGN_IN);
    }
  }, [pathname]);

  return (
    <Routes>
      {routeList.map((route) => (
        <Route
          key={route.description}
          path={route.path}
          element={createElement(route.component)}
        />
      ))}
    </Routes>
  );
};
