import { IRoute } from '@/router/routeList';
import { Home } from '@/v3/pages/home';

export const NEW_PATH = {
  HOME: '/home',
};

export const routerList: IRoute[] = [
  {
    isPrivate: true,
    description: 'Home',
    path: NEW_PATH.HOME,
    component: Home,
  },
];
