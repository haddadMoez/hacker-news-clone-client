import React from 'react';
import { Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import Header from './Header';
import routes from '../utils/routes';

const App = () => {
  return (
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
  );
};

export default App;
