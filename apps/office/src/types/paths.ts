import { ComponentType } from 'react';
import HomePage from '@/pages/home/home.page';
import { PAGE_CATEGORY } from '@/amplitude/amplitude.enum';

export const PATH = {
  HOME: '/',
};

export const SERVICE_URL = `https://app.gomiinsight.com`;

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
    //메인
    pageCategory: PAGE_CATEGORY.MAIN,
    pageName: 'main',
    path: PATH.HOME,
    component: HomePage,
  },
];
