import type { ComponentType } from 'react';

import * as AuthRoutes from '@/pages/auth';
import SearchResults from '@/pages/result/SearchResults';
import SearchProducts from '@/pages/search/SearchProducts';

export type TLayoutType = 'Default' | 'Common1Section' | 'Common2Section';
export const PATH = {
  SEARCH_PRODUCTS: '/',
  SEARCH_RESULTS: '/search/results',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  SIGN_UP_WITH_GOOGLE: '/signup/social',
  FIND_PASSWORD: '/find/password',
  FIND_ID: '/find/id',
  REAPPLY_PASSWORD: '/signin/password',
} as const;

type TPathKey = keyof typeof PATH;
export type TPathType = (typeof PATH)[TPathKey];
export interface IRoute {
  description: string;
  path: TPathType;
  component: ComponentType;
  layoutType: TLayoutType;
}

export const signInRouter = {
  description: 'signIn',
  path: PATH.SIGN_IN,
  component: AuthRoutes.FindId,
};

export const routeList: IRoute[] = [
  {
    description: 'signUp',
    path: PATH.SIGN_UP,
    component: AuthRoutes.SignUp,
    layoutType: 'Common1Section',
  },
  {
    description: 'signUpWithGoogle',
    path: PATH.SIGN_UP_WITH_GOOGLE,
    component: AuthRoutes.SignUpSocial,
    layoutType: 'Common1Section',
  },
  {
    description: 'findPassword',
    path: PATH.FIND_PASSWORD,
    component: AuthRoutes.FindPassword,
    layoutType: 'Common2Section',
  },
  {
    description: 'reapplyPassword',
    path: PATH.REAPPLY_PASSWORD,
    component: AuthRoutes.ResetPassword,
    layoutType: 'Common2Section',
  },
  {
    description: 'findIdentification',
    path: PATH.FIND_ID,
    component: AuthRoutes.FindId,
    layoutType: 'Common2Section',
  },
  {
    description: 'signIn',
    path: PATH.SIGN_IN,
    component: AuthRoutes.SignIn,
    layoutType: 'Common2Section',
  },
  {
    description: 'searchResults',
    path: PATH.SEARCH_RESULTS,
    component: SearchResults,
    layoutType: 'Default',
  },
  {
    description: 'seachProducts',
    path: PATH.SEARCH_PRODUCTS,
    component: SearchProducts,
    layoutType: 'Default',
  },
];

export function getComponentByPathname(pathname: string): TLayoutType {
  const layout = routeList.find((route) => route.path === pathname)?.layoutType;

  if (layout) {
    return layout;
  }
  throw new Error('pathname을 확인해주세요.');
}
/*

// search
  home: '/',
  // result
  searchResult: '/search-result',
  // account
  account: '/account/*',
  signIn: '/sign-in',
  signUp: '/sign-up',
  signUpSocial: '/sign-up-social',
  welcome: '/welcome',
  findId: '/find-id',
  findPassword: '/find-password',
  findNoResult: '/find-no-result',
  resetPassword: '/reset-password',
  notAuthorized: '/not-authorized',
 */
