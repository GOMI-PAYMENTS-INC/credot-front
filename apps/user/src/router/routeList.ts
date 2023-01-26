import type { ComponentType } from 'react';

import { Flural, Singular } from '@/components/layouts';
import * as AuthRoutes from '@/pages/auth';
import SearchResults from '@/pages/result/SearchResults';
import SearchProduct from '@/pages/search/SearchProduct';

export interface IRoute {
  description: string;
  path: string;
  component: ComponentType;
  layout: ComponentType;
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
  {
    description: 'seachProducts',
    path: PATH.SEARCH_PRODUCTS,
    component: SearchProduct,
    layout: Flural,
  },
  {
    description: 'searchResults',
    path: PATH.SEARCH_RESULTS,
    component: SearchResults,
    layout: Singular,
  },
  {
    description: 'signIn',
    path: PATH.SIGN_IN,
    component: AuthRoutes.SignIn,
    layout: Flural,
  },
  {
    description: 'signUp',
    path: PATH.SIGN_UP,
    component: AuthRoutes.SignUp,
    layout: Singular,
  },
  {
    description: 'signUpWithGoogle',
    path: PATH.SIGN_UP_WITH_GOOGLE,
    component: AuthRoutes.SignUpSocial,
    layout: Singular,
  },
  {
    description: 'findPassword',
    path: PATH.FIND_PASSWORD,
    component: AuthRoutes.FindPassword,
    layout: Singular,
  },
  {
    description: 'findIdentification',
    path: PATH.FIND_ID,
    component: AuthRoutes.FindId,
    layout: Singular,
  },
  {
    description: 'reapplyPassword',
    path: PATH.REAPPLY_PASSWORD,
    component: AuthRoutes.ResetPassword,
    layout: Flural,
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
