import React from 'react';
import _ from 'lodash';

import { useAuth } from '../context/AuthContext';
import { timeDifferenceForDate } from '../utils/time-difference';

const Link = ({ link, index }) => {
  const auth = useAuth();
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {!_.isEmpty(auth.token) && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            // onClick={vote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {!_.isEmpty(auth.token) && (
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;
