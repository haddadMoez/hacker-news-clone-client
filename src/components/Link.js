import React from 'react';
import _ from 'lodash';
import { useMutation, gql } from '@apollo/client';

import { useAuth } from '../context/AuthContext';
import { timeDifferenceForDate } from '../utils/time-difference';
import { FEED_QUERY } from './LinkList';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      link
      user
    }
  }
`;

const Link = ({ link, index }) => {
  const auth = useAuth();
  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update(cache, { data: { vote } }) {
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
      });

      const updatedLinks = _.map(feed.links, (feedLink) => {
        if (feedLink.id === link.id) {
          let votesClone = _.clone(feedLink.votes);
          votesClone = _.union(vote.user.split(), votesClone);
          return {
            ...feedLink,
            votes: votesClone,
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
  });
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {!_.isEmpty(auth.token) && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={vote}
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
