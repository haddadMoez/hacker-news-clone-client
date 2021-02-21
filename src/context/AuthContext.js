import React, { createContext, useContext } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  auth: {
    user: null,
    token: null,
  },
  setAuth: () => {},
});

const AuthProvider = ({ children, value }) => {
  const authMemo = React.useMemo(() => value, [value]);
  return (
    <AuthContext.Provider value={authMemo}>{children}</AuthContext.Provider>
  );
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
