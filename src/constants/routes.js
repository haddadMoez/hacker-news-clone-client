import { lazy } from 'react';
const Login = lazy(() => import('../components/Login'));
const LinkList = lazy(() => import('../components/LinkList'));
const CreateLink = lazy(() => import('../components/CreateLink'));

const ROUTE_TYPES = {
  LOGIN: 'LOGIN',
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

const ROUTES = [
  {
    path: '/',
    component: LinkList,
    type: ROUTE_TYPES.PUBLIC,
  },
  {
    path: '/login',
    component: Login,
    type: ROUTE_TYPES.LOGIN,
  },
  {
    path: '/create',
    component: CreateLink,
    type: ROUTE_TYPES.PRIVATE,
  },
];

export { ROUTES, ROUTE_TYPES };
