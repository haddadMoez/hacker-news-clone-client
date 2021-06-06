import React, { Suspense, lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Loader from 'react-loader';
import _ from 'lodash';
import { ROUTES } from '../constants/routes';
const Header = lazy(() => import('./Header'));
const NoMatch = lazy(() => import('./NoMatch'));
const CustomRoute = lazy(() => import('./Route'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="center w85">
        <Header />
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
      </div>
    </Suspense>
  );
};

export default App;
