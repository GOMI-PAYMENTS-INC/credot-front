import { ComponentType } from 'react';

import { FindId, FindPassword, SignIn, SignUp, TemporaryPassword } from '@/auth';
import { PATH } from '@/common/constants';
import Apply from '@/v2/apply/Apply';
import Connect from '@/v2/connect/Connect';
import { Landing } from '@/v2/landing/Landing';

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
    description: 'Landing',
    path: PATH.LANDING,
    component: Landing,
  },
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
    description: 'Apply',
    path: PATH.APPLY,
    component: Apply,
  },
  {
    isPrivate: true,
    description: 'Connect',
    path: PATH.CONNECT,
    component: Connect,
  },
];
