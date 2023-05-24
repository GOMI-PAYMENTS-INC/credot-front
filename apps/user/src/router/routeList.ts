import { ComponentType } from 'react';
import * as AuthRoutes from '@/pages/auth';
import SearchKeywords from '@/pages/search/SearchKeywords';
import * as ReportRoutes from '@/pages/report';
import { PATH } from '@/types/enum.code';

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
    //소셜 회원가입시 전화번호 추가 입력
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
    isPrivate: true,
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
];
