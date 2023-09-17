import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import Main from '@/home/Main';
import Price from '@/price/Price';

import { PAGE_CATEGORY } from '@/amplitude/amplitude.enum';

export const PATH = {
  MAIN: '/',
  PRICE: '/price',
};

type TPathKey = keyof typeof PATH;

export type TPathType = (typeof PATH)[TPathKey];

export const Router = () => {
  const { pathname } = useLocation();
  const routeList = [
    {
      pageCategory: PAGE_CATEGORY.MAIN,
      pageName: PAGE_CATEGORY.MAIN,
      path: PATH.MAIN,
      component: Main(),
    },
    {
      pageCategory: PAGE_CATEGORY.KEYWORD_ANALYSIS_PRICING,
      pageName: PAGE_CATEGORY.KEYWORD_ANALYSIS_PRICING,
      path: PATH.PRICE,
      component: Price(),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout>
      <Routes>
        {routeList.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Layout>
  );
};
