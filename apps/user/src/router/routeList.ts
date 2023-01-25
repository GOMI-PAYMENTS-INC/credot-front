import type { ComponentType } from 'react';

import * as AuthRoutes from '@/pages/auth';
import SearchResults from '@/pages/result/SearchResults';
import SearchProduct from '@/pages/search/SearchProduct';

// import FindId from '@/pages/auth/FindId';

export interface IRoute {
  description: string;
  path: string;
  component: ComponentType;
}

export const PATH = {
  SEARCH_PRODUCTS: '/',
  SEARCH_RESULTS: '/search/results',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  SIGN_UP_WITH_GOOGLE: '/signup/social',
  FIND_PASSWORD: '/find/password',
  FIND_ID: '/find/id',
  REAPPLY_PASSWORD: '/signin/password',
};
export const signInRouter = {
  description: 'signIn',
  path: PATH.SIGN_IN,
  component: AuthRoutes.FindId,
};
export const routeList: IRoute[] = [
  { description: 'seachProducts', path: PATH.SEARCH_PRODUCTS, component: SearchProduct },
  { description: 'searchResults', path: PATH.SEARCH_RESULTS, component: SearchResults },
  { description: 'signIn', path: PATH.SIGN_IN, component: AuthRoutes.SignIn },
  { description: 'signUp', path: PATH.SIGN_UP, component: AuthRoutes.SignUp },
  {
    description: 'signUpWithGoogle',
    path: PATH.SIGN_UP_WITH_GOOGLE,
    component: AuthRoutes.SignUpSocial,
  },
  {
    description: 'findPassword',
    path: PATH.FIND_PASSWORD,
    component: AuthRoutes.FindPassword,
  },
  { description: 'findIdentification', path: PATH.FIND_ID, component: AuthRoutes.FindId },
  {
    description: 'reapplyPassword',
    path: PATH.REAPPLY_PASSWORD,
    component: AuthRoutes.ResetPassword,
  },
];

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
