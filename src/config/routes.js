import Login from '../components/Login';
import LinkList from '../components/LinkList';
import CreateLink from '../components/CreateLink';

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
