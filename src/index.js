import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import _ from 'lodash';

import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { REACT_APP_HTTP_LINK, REACT_APP_HTTP_WS_LINK } from './constants';
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
    },
  };
});

const wsLink = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const session = useSession();
  return new WebSocketLink({
    uri: REACT_APP_HTTP_WS_LINK,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: _.get(session, 'token', null),
      },
    },
  });
};

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink(),
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
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
