import { ComponentType } from 'react';
import Intro from '@/home/Home';
import Price from '@/price/Price';
import { PAGE_CATEGORY } from '@/amplitude/amplitude.enum';

export const PATH = {
  HOME: '/',
  PRICE: '/price',
};

type TPathKey = keyof typeof PATH;

export type TPathType = (typeof PATH)[TPathKey];

export interface IRoute {
  pageCategory: (typeof PAGE_CATEGORY)[keyof typeof PAGE_CATEGORY];
  pageName: string;
  path: TPathType;
  component: ComponentType;
}

export const routeList: IRoute[] = [
  {
    pageCategory: PAGE_CATEGORY.MAIN,
    pageName: PAGE_CATEGORY.MAIN,
    path: PATH.HOME,
    component: Intro,
  },
  {
    pageCategory: PAGE_CATEGORY.PRICE,
    pageName: PAGE_CATEGORY.PRICE,
    path: PATH.PRICE,
    component: Price,
  },
];
