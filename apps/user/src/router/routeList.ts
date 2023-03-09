import type { ComponentType } from 'react';

import * as AuthRoutes from '@/pages/auth';
import SearchKeywords from '@/pages/search/SearchKeywords';
import * as ReportRoutes from '@/pages/report';

export type TLayoutType =
  | 'Default'
  | 'Common1Section'
  | 'Common2Section'
  | 'FindAccountLayout';

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
  component: AuthRoutes.FindIdRefactor,
};

export const routeList: IRoute[] = [
  {
    //회원가입
    description: 'SignUp',
    path: PATH.SIGN_UP,
    component: AuthRoutes.SignUp,
    layoutType: 'Common1Section',
  },
  {
    //소셜 로그인
    description: 'SignUpWithGoogle',
    path: PATH.SIGN_UP_WITH_GOOGLE,
    component: AuthRoutes.SignUpSocial,
    layoutType: 'Common1Section',
  },
  {
    //비밀번호 찾기
    description: 'FindPassword',
    path: PATH.FIND_PASSWORD,
    component: AuthRoutes.FindPassword,
    layoutType: 'FindAccountLayout',
  },
  {
    //아이디 찾기
    description: 'FindIdentification',
    path: PATH.FIND_ID,
    component: AuthRoutes.FindIdRefactor,
    layoutType: 'FindAccountLayout',
  },
  {
    //로그인
    description: 'SignIn',
    path: PATH.SIGN_IN,
    component: AuthRoutes.SignIn,
    layoutType: 'Common2Section',
  },
  {
    //비밀번호 재설정
    description: 'ReapplyPassword',
    path: PATH.REAPPLY_PASSWORD,
    component: AuthRoutes.ResetPassword,
    layoutType: 'Common2Section',
  },
  {
    //검색
    description: 'SearchProducts',
    path: PATH.SEARCH_PRODUCTS,
    component: SearchKeywords,
    layoutType: 'Default',
  },
  {
    description: 'ReportList',
    path: PATH.GET_REPORT_LIST,
    component: ReportRoutes.ReportList,
    layoutType: 'Default',
  },
  {
    description: 'DetailReport',
    path: PATH.ANALYSIS_REPORT_LIST,
    component: ReportRoutes.DetailReport,
    layoutType: 'Default',
  },
];

export function getComponentByPathname(path: string): TLayoutType {
  const layout = routeList.find((route) => route.path === path)?.layoutType;

  if (layout || layout === null) {
    return layout;
  }

  throw new Error('pathname을 확인해주세요.');
}
