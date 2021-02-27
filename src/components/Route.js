import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import _ from 'lodash';

import { useAuth } from '../context/AuthContext';
import { ROUTE_TYPES } from '../constants/routes';

const CustomRoute = ({ component: Component, type, ...rest }) => {
  let auth = useAuth();
  const { PUBLIC, PRIVATE, LOGIN } = ROUTE_TYPES;

  if (_.isEqual(type, PUBLIC))
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  else if (_.isEqual(type, LOGIN))
    return (
      <Route
        {...rest}
        render={({ location }) =>
          !auth.token ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  else if (_.isEqual(type, PRIVATE))
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.token ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
};

export default CustomRoute;
