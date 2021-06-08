import React, { Suspense, lazy, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Loader from 'react-loader';
import _ from 'lodash';

import { ROUTES } from '../constants/routes';
import { LINKS_PER_PAGE } from '../constants';
import PaginationContext from './pagination';
const Header = lazy(() => import('./Header'));
const NoMatch = lazy(() => import('./NoMatch'));
const CustomRoute = lazy(() => import('./Route'));

const App = () => {
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: LINKS_PER_PAGE,
    sort: { createdAt: 'desc' },
  });
  return (
    <Suspense fallback={<Loader />}>
      <div className="center w85">
        <Header />
        <PaginationContext.Provider value={{ pagination, setPagination }}>
          <div className="ph3 pv1 background-gray">
            <Switch>
              {_.map(ROUTES, (route) => (
                <CustomRoute
                  exact
                  type={route.type}
                  path={route.path}
                  component={route.component}
                />
              ))}
              <Route exact path="/" render={() => <Redirect to="/feed/1" />} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </div>
        </PaginationContext.Provider>
      </div>
    </Suspense>
  );
};

export default App;
