import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { useAuth } from '../context/AuthContext';
import { destroySession } from '../utils/session';

const Header = () => {
  const history = useHistory();
  const auth = useAuth();

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to="/" className="ml1 no-underline black">
          feed
        </Link>
        <div className="ml1">|</div>
        <Link to="/search" className="ml1 no-underline black">
          search
        </Link>
        {!_.isEmpty(auth.token) && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to="/create" className="ml1 no-underline black">
              submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {!_.isEmpty(auth.token) ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              destroySession();
              history.push('/login');
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
