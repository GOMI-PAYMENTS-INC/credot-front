import { IRoute } from '@/router/routeList';
import { History, Home } from '@/v3/pages';

export const NEW_PATH = {
  HOME: '/home',
  HISTORY: '/history',
};

export const routerList: IRoute[] = [
  {
    isPrivate: true,
    description: '홈',
    path: NEW_PATH.HOME,
    component: Home,
  },
  {
    isPrivate: true,
    description: '서비스 이용내역',
    path: NEW_PATH.HISTORY,
    component: History,
  },
];
