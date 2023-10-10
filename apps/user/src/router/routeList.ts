import { ComponentType } from 'react';
import {
  FindId,
  SignUp,
  SignUpByGoogle,
  FindPassword,
  SignIn,
  TemporaryPassword,
} from '@/auth';
import { PATH } from '@/common/constants';
import { SearchKeywords } from '@/search/SearchKeywords';
import * as ReportRoutes from '@/report';
import { Subscribe, UpgradePlan, ResultPage, DownGrade } from '@/subscribe';
import Category from '@/category/Category';

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
  component: FindId,
};

export const routeList: IRoute[] = [
  {
    isPrivate: false,
    description: 'SignUp',
    path: PATH.SIGN_UP,
    component: SignUp,
  },
  {
    isPrivate: false,
    description: 'SignUpWithGoogle',
    path: PATH.SIGN_UP_WITH_GOOGLE,
    component: SignUpByGoogle,
  },
  {
    isPrivate: false,
    description: 'FindPassword',
    path: PATH.FIND_PASSWORD,
    component: FindPassword,
  },
  {
    isPrivate: false,
    description: 'FindIdentification',
    path: PATH.FIND_ID,
    component: FindId,
  },
  {
    isPrivate: false,
    description: 'SignIn',
    path: PATH.SIGN_IN,
    component: SignIn,
  },
  {
    isPrivate: true,
    description: 'ReapplyPassword',
    path: PATH.REAPPLY_PASSWORD,
    component: TemporaryPassword,
  },
  {
    isPrivate: true,
    description: 'SearchProducts',
    path: PATH.SEARCH_PRODUCTS,
    component: SearchKeywords,
  },

  {
    isPrivate: true,
    description: 'ReportList',
    path: PATH.REPORT_LIST,
    component: ReportRoutes.ReportList,
  },
  {
    isPrivate: true,
    description: 'DetailReport',
    path: PATH.REPORT_DETAIL,
    component: ReportRoutes.DetailReportPage,
  },
  {
    isPrivate: false,
    description: 'DetailReportByShare',
    path: PATH.REPORT_DETAIL_BY_SHARE,
    component: ReportRoutes.DetailReportPageByShare,
  },
  {
    isPrivate: true,
    description: 'Subscribe',
    path: PATH.SUBSCRIBE,
    component: Subscribe,
  },
  {
    isPrivate: true,
    description: 'UpgradePlan',
    path: PATH.UPGRADE_PLAN,
    component: UpgradePlan,
  },
  {
    isPrivate: true,
    description: 'DownGrade',
    path: PATH.DOWN_GRADE,
    component: DownGrade,
  },
  {
    isPrivate: true,
    description: 'Unsubscription',
    path: PATH.UNSUBSCRIPTION,
    component: DownGrade,
  },
  {
    isPrivate: true,
    description: 'ResultPage',
    path: PATH.RESULT_OF_PAY_REQUEST,
    component: ResultPage,
  },
  {
    isPrivate: true,
    description: 'Category',
    path: PATH.CATEGORY,
    component: Category,
  },
];
