import React, { useEffect, createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { useSession, destroySession } from '../utils/session';
import { isValidToken } from '../utils/token-validation';

const AuthContext = createContext({
  auth: {
    user: null,
    token: null,
  },
  setAuth: () => {},
});

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const session = useSession();

  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  const isAuthenticated = () => {
    if (_.isEmpty(session) || !isValidToken(_.get(session, 'token', null))) {
      setAuth({ user: null, token: null });
      destroySession();
    } else {
      setAuth({ user: _.get(session, 'user'), token: _.get(session, 'token') });
    }
  };

  useEffect(() => {
    isAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (_.isUndefined(context))
    throw new Error('useAuth must be used within a AuthProvider');
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export { AuthProvider, useAuth };
