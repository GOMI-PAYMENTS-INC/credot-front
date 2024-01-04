import { IRoute } from '@/router/routeList';
import { Apply, History, Home, Landing } from '@/v3/pages';

export const NEW_PATH = {
  HOME: '/home',
  HISTORY: '/history',
  LANDING: '/',
  APPLY: '/apply',
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
  {
    isPrivate: false,
    description: '랜딩페이지',
    path: NEW_PATH.LANDING,
    component: Landing,
  },
  {
    isPrivate: false,
    description: '신청페이지',
    path: NEW_PATH.APPLY,
    component: Apply,
  },
];
