import { ComponentType } from 'react';

import { SignIn } from '@/auth';
import { PATH } from '@/common/constants';
import { Home } from '@/v2/home';
import { TransactionDone, WithdrawalDone, WithdrawalReady } from '@/v2/prefund/';

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
    isPrivate: true,
    description: 'WITHDRAWAL_READY',
    path: PATH.WITHDRAWAL_READY,
    component: WithdrawalReady,
  },
  {
    isPrivate: true,
    description: 'WITHDRAWAL_DONE',
    path: PATH.WITHDRAWAL_DONE,
    component: WithdrawalDone,
  },
  {
    isPrivate: true,
    description: 'TRANSACTION_DONE',
    path: PATH.TRANSACTION_DONE,
    component: TransactionDone,
  },
  {
    isPrivate: true,
    description: 'HOME',
    path: PATH.HOME,
    component: Home,
  },
  {
    isPrivate: false,
    description: 'SignIn',
    path: PATH.SIGN_IN,
    component: SignIn,
  },
];
