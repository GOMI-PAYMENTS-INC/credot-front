import { ComponentType } from 'react';

import { SignIn } from '@/auth';
import { PATH } from '@/common/constants';

type TPathKey = keyof typeof PATH;

export type TPathType = (typeof PATH)[TPathKey];
export interface IRoute {
  isPrivate: boolean;
  description: string;
  path: TPathType;
  component: ComponentType;
}

export const routeList: IRoute[] = [
  {
    isPrivate: false,
    description: 'SignIn',
    path: PATH.SIGN_IN,
    component: SignIn,
  },
];
