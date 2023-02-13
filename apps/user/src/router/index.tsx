import { createElement, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, matchRoutes } from 'react-router-dom';

import Layout from '@/components/layouts/Layout';
import { getComponentByPathname, PATH, routeList, TLayoutType } from '@/router/routeList';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';

export const Router = () => {
  const { pathname } = useLocation();

  const [{ route }] = matchRoutes(routeList, pathname) || [];

  const navigator = useNavigate();
  const isLogin = authTokenStorage.getToken() !== null;
  const [layoutType, setLayoutType] = useState<TLayoutType>('Default');

  useEffect((): void => {
    setLayoutType(getComponentByPathname(route.path));

    if (
      isFalsy(isLogin) &&
      [PATH.SEARCH_PRODUCTS, PATH.GET_REPORT_LIST].some((path) => path === route.path)
    ) {
      navigator(PATH.SIGN_IN);
    }
  }, [pathname]);

  return (
    <Layout layoutType={layoutType}>
      <Routes>
        {routeList.map((route) => (
          <Route
            key={route.description}
            path={route.path}
            element={createElement(route.component)}
          />
        ))}
      </Routes>
    </Layout>
  );
};
