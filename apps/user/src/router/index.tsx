import { createElement, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, matchRoutes } from 'react-router-dom';

import Layout from '@/components/layouts/Layout';
import { getComponentByPathname, PATH, routeList, TLayoutType } from '@/router/routeList';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { isIncluded } from '@/utils/isIncluded';

export const Router = () => {
  const { pathname } = useLocation();

  const [{ route }] = matchRoutes(routeList, pathname) || [];

  const navigation = useNavigate();
  const isLogin = authTokenStorage.getToken() !== null;
  const [layoutType, setLayoutType] = useState<TLayoutType>('Default');

  useEffect((): void => {
    setLayoutType(getComponentByPathname(route.path));

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
