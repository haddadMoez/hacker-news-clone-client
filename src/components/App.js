import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import Header from './Header';
import { AuthProvider } from '.././context/AuthContext';
import routes from '.././config/routes';

const App = () => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  return (
    <AuthProvider value={{ auth, setAuth }}>
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
    </AuthProvider>
  );
};

export default App;
