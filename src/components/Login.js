import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import Loader from 'react-loader';

import { setSession } from '../utils/session';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../constants/mutations';

const Login = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState(null);

  const [login, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signin }) => {
      setSession({ user: signin.user, token: signin.token });
      history.push('/');
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          setError(message)
        );

      if (networkError) setError(networkError);
    },
  });

  const [signup, { loading: signupLoading }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      history.push('/');
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          setError(message)
        );

      if (networkError) setError(networkError);
    },
  });

  return (
    <>
      {error && <pre>{error}</pre>}
      <div>
        {(signupLoading || loginLoading) && <Loader />}
        <h4 className="mv3">{formState.login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!formState.login && (
            <input
              value={formState.name}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value,
                })
              }
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            type="text"
            placeholder="Your email address"
          />
          <input
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <button
            className="pointer mr2 button"
            onClick={formState.login ? login : signup}
          >
            {formState.login ? 'login' : 'create account'}
          </button>
          <button
            className="pointer button"
            onClick={(e) =>
              setFormState({
                ...formState,
                login: !formState.login,
              })
            }
          >
            {formState.login
              ? 'need to create an account?'
              : 'already have an account?'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
