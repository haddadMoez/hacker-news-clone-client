import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateLink from './CreateLink';
import Header from './Header';
import LinkList from './LinkList';
import Login from './Login';
import { AuthProvider } from '.././context/AuthContext';

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
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
