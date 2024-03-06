import { ComponentType } from 'react';

import { FindId, FindPassword, SignIn, SignUp, TemporaryPassword } from '@/auth';
import { PATH } from '@/common/constants';
import { FutureFundApply, Home } from '@/v3/pages';
import { routerList } from '@/v3/router/router-list';

type TPathKey = keyof typeof PATH;

export type TPathType = (typeof PATH)[TPathKey];
export interface IRoute {
  isPrivate: boolean;
  description: string;
  path: TPathType | string;
  component: ComponentType;
}

export const routeList: IRoute[] = [
  ...routerList,
  {
    isPrivate: false,
    description: 'SignUp',
    path: PATH.SIGN_UP,
    component: SignUp,
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
    description: 'Breakdown',
    path: PATH.BREAKDOWN,
    component: Home,
  },
  {
    isPrivate: true,
    description: 'Future Fund Apply',
    path: PATH.FUTURE_FUND_APPLY,
    component: FutureFundApply,
  },
];
