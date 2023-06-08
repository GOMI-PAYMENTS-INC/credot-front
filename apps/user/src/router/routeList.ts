import { ComponentType } from 'react';
import * as AuthRoutes from '@/pages/auth';
import SearchKeywords from '@/pages/search/SearchKeywords';
import * as ReportRoutes from '@/pages/report';

export const PATH = {
  SEARCH_PRODUCTS: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  SIGN_UP_WITH_GOOGLE: '/signup/social',
  FIND_PASSWORD: '/find/password',
  FIND_ID: '/find/id',
  REAPPLY_PASSWORD: '/signin/password',
  REPORT_LIST: '/report',
  REPORT_DETAIL: '/report/:id',
  REPORT_DETAIL_BY_SHARE: '/share/:id',
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
  description: 'SignIn',
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
    component: AuthRoutes.SignUpByGoogle,
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
    //리포트 목록
    isPrivate: true,
    description: 'ReportList',
    path: PATH.REPORT_LIST,
    component: ReportRoutes.ReportList,
  },
  {
    //리포트 상세
    isPrivate: true,
    description: 'DetailReport',
    path: PATH.REPORT_DETAIL,
    component: ReportRoutes.DetailReportPage,
  },
  {
    //리포트 상세 - 공유하기
    isPrivate: false,
    description: 'DetailReportByShare',
    path: PATH.REPORT_DETAIL_BY_SHARE,
    component: ReportRoutes.DetailReportPageByShare,
  },
];
