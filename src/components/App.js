import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader';
import _ from 'lodash';
import routes from '../utils/routes';
const Header = lazy(() => import('./Header'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            {_.map(routes, (route) => (
              <Route
                exact
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Suspense>
  );
};

export default App;
