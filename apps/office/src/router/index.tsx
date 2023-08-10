import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HackleExperiment, HackleVariation } from '@hackler/react-sdk';
import Layout from '@/layouts/Layout';
import Intro from '@/home/Home';
import Price from '@/price/Price';
import Priview from '@/preview/Preview';
import { PAGE_CATEGORY } from '@/amplitude/amplitude.enum';

export const PATH = {
  HOME: '/',
  PRICE: '/price',
  PREVIEW: '/preview',
};

type TPathKey = keyof typeof PATH;

export type TPathType = (typeof PATH)[TPathKey];

const varidation: TVaridationType =
  Math.floor(Math.random() * 1000) % 2 === 0 ? 'A' : 'B';

export const Router = () => {
  const { pathname } = useLocation();
  const routeList = [
    {
      pageCategory: PAGE_CATEGORY.MAIN,
      pageName: PAGE_CATEGORY.MAIN,
      path: PATH.HOME,
      component: Intro({ varidation }),
    },
    {
      pageCategory: PAGE_CATEGORY.PRICE,
      pageName: PAGE_CATEGORY.PRICE,
      path: PATH.PRICE,
      component: Price(),
    },
    {
      pageCategory: PAGE_CATEGORY.PREVIEW,
      pageName: PAGE_CATEGORY.PREVIEW,
      path: PATH.PREVIEW,
      component: Priview({ varidation }),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <HackleExperiment experimentKey={8}>
      <HackleVariation variation={'A'}>
        <Layout>
          <Routes>
            {routeList.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Routes>
        </Layout>
      </HackleVariation>
      <HackleVariation variation={'B'}>
        <Layout>
          <Routes>
            {routeList.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Routes>
        </Layout>
      </HackleVariation>
    </HackleExperiment>
  );
};
