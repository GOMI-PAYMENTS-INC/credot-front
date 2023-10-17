import { useEffect, createElement } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import Main from '@/home/Main';
import Price from '@/price/Price';
import Blog from '@/blog/Blog';
import { BlogCategory, Landing } from '@/blog/elements';

import { PAGE_CATEGORY } from '@/amplitude/amplitude.enum';
import { PATH } from '@/common/constants';
import { SERP, SEO, SearchTrend, CVR, CPC } from '@/blog/contents';

type TPathKey = keyof typeof PATH;

export type TPathType = (typeof PATH)[TPathKey];

export const Router = () => {
  const { pathname } = useLocation();
  const routeList = [
    {
      pageCategory: PAGE_CATEGORY.MAIN,
      pageName: PAGE_CATEGORY.MAIN,
      path: PATH.MAIN,
      component: Main,
    },
    {
      pageCategory: PAGE_CATEGORY.CONTENT_VIEWED,
      pageName: PAGE_CATEGORY.CONTENT_VIEWED,
      path: PATH.BLOG,
      component: Blog,
    },
    {
      pageCategory: PAGE_CATEGORY.KEYWORD_ANALYSIS_PRICING,
      pageName: PAGE_CATEGORY.KEYWORD_ANALYSIS_PRICING,
      path: PATH.PRICE,
      component: Price,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout>
      <Routes>
        {routeList.map((route, index) => {
          if (pathname.includes(PATH.BLOG)) {
            return (
              <Route key={index} path={PATH.BLOG} element={createElement(Blog)}>
                <Route path={PATH.BLOG} element={createElement(Landing)} />
                <Route path={PATH.CATEGORY} element={createElement(BlogCategory)} />
                <Route path={PATH.SERP} element={createElement(SERP)} />
                <Route path={PATH.SEO} element={createElement(SEO)} />
                <Route path={PATH.SEARCH_TREND} element={createElement(SearchTrend)} />
                <Route path={PATH.CVR} element={createElement(CVR)} />
                <Route path={PATH.CPC} element={createElement(CPC)} />
              </Route>
            );
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={createElement(route.component)}
            />
          );
        })}
      </Routes>
    </Layout>
  );
};
