import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import _ from 'lodash';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { REACT_APP_HTTP_LINK } from './constants';
import { AuthProvider } from './context/AuthContext';
import { useSession } from './utils/session';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: REACT_APP_HTTP_LINK,
});

const authLink = setContext((parent, { headers }) => {
  const session = useSession();
  return {
    headers: {
      ...headers,
      authorization: _.get(session, 'token', null),
      user: _.get(session, 'user.id', null),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
