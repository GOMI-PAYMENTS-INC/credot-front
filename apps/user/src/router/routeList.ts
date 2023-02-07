import type { ComponentType } from 'react';

import * as AuthRoutes from '@/pages/auth';
import SearchProducts from '@/pages/search/SearchProducts';
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
    //회원가입
    description: 'signUp',
    path: PATH.SIGN_UP,
    component: AuthRoutes.SignUp,
    layoutType: 'Common1Section',
  },
  {
    //소셜 로그인
    description: 'signUpWithGoogle',
    path: PATH.SIGN_UP_WITH_GOOGLE,
    component: AuthRoutes.SignUpSocial,
    layoutType: 'Common1Section',
  },
  {
    //비밀번호 찾기
    description: 'findPassword',
    path: PATH.FIND_PASSWORD,
    component: AuthRoutes.FindPassword,
    layoutType: 'FindAccountLayout',
  },
  {
    //아이디 찾기
    description: 'findIdentification',
    path: PATH.FIND_ID,
    component: AuthRoutes.FindId,
    layoutType: 'FindAccountLayout',
  },
  {
    //로그인
    description: 'signIn',
    path: PATH.SIGN_IN,
    component: AuthRoutes.SignIn,
    layoutType: 'Common2Section',
  },
  {
    //비밀번호 재설정
    description: 'reapplyPassword',
    path: PATH.REAPPLY_PASSWORD,
    component: AuthRoutes.ResetPassword,
    layoutType: 'Common2Section',
  },
  {
    //검색
    description: 'searchProducts',
    path: PATH.SEARCH_PRODUCTS,
    component: SearchProducts,
    layoutType: 'Default',
  },
  {
    description: 'ReportList',
    path: PATH.GET_REPORT_LIST,
    component: ReportRoutes.ReportList,
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
