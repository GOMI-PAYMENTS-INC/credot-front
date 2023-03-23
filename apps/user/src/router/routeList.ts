import { ComponentType } from 'react';

import * as AuthRoutes from '@/pages/auth';
import SearchKeywords from '@/pages/search/SearchKeywords';
import * as ReportRoutes from '@/pages/report';
import { ErrorPage } from '@/pages/ErrorPage';

export const PATH = {
  SEARCH_PRODUCTS: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  SIGN_UP_WITH_GOOGLE: '/signup/social',
  FIND_PASSWORD: '/find/password',
  FIND_ID: '/find/id',
  REAPPLY_PASSWORD: '/signin/password',
  GET_REPORT_LIST: '/report/list',
  ANALYSIS_REPORT_LIST: '/report/list/:id',
  ERROR_PAGE: '/error',
} as const;

type TPathKey = keyof typeof PATH;

export type TPathType = (typeof PATH)[TPathKey];
export interface IRoute {
  isPrivate: boolean;
  description: string;
  path: TPathType;
  component: ComponentType;
}

export const signInRouter = {
  description: 'signIn',
  path: PATH.SIGN_IN,
  component: AuthRoutes.FindId,
};

export const routeList: IRoute[] = [
  {
    //회원가입
    isPrivate: false,
    description: 'SignUp',
    path: PATH.SIGN_UP,
    component: AuthRoutes.SignUp,
  },
  {
    //소셜 로그인
    isPrivate: false,
    description: 'SignUpWithGoogle',
    path: PATH.SIGN_UP_WITH_GOOGLE,
    component: AuthRoutes.SignUpSocial,
  },
  {
    //비밀번호 찾기
    isPrivate: false,
    description: 'FindPassword',
    path: PATH.FIND_PASSWORD,
    component: AuthRoutes.FindPassword,
  },
  {
    //아이디 찾기
    isPrivate: false,
    description: 'FindIdentification',
    path: PATH.FIND_ID,
    component: AuthRoutes.FindId,
  },
  {
    //로그인
    isPrivate: false,
    description: 'SignIn',
    path: PATH.SIGN_IN,
    component: AuthRoutes.SignIn,
  },
  {
    //비밀번호 재설정
    isPrivate: false,
    description: 'ReapplyPassword',
    path: PATH.REAPPLY_PASSWORD,
    component: AuthRoutes.TemporaryPassword,
  },
  {
    //검색
    isPrivate: true,
    description: 'SearchProducts',
    path: PATH.SEARCH_PRODUCTS,
    component: SearchKeywords,
  },
  {
    isPrivate: true,
    description: 'ReportList',
    path: PATH.GET_REPORT_LIST,
    component: ReportRoutes.ReportList,
  },
  {
    isPrivate: true,
    description: 'DetailReport',
    path: PATH.ANALYSIS_REPORT_LIST,
    component: ReportRoutes.DetailReport,
  },
  {
    isPrivate: false,
    description: 'ErrorPage',
    path: PATH.ERROR_PAGE,
    component: ErrorPage,
  },
];
