import { lazy } from 'react';
const Login = lazy(() => import('../components/Login'));
const LinkList = lazy(() => import('../components/LinkList'));
const CreateLink = lazy(() => import('../components/CreateLink'));

const routes = [
  {
    path: '/',
    component: LinkList,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/create',
    component: CreateLink,
  },
  // TO DO
  //   {
  //     path: '/*',
  //     component: PageNotFound,
  //   },
];

export default routes;
