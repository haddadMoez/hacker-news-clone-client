import React from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import _ from 'lodash';

import Link from './Link';
import Loader from 'react-loader';
import { FEED_QUERY } from '../constants/queries';
import { LINKS_PER_PAGE } from '../constants';
import {
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from '../constants/subscription';

const LinkList = () => {
  const history = useHistory();
  const isNewPage = history.location.pathname.includes('feed');
  const pageIndexParams = history.location.pathname.split('/');
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const getQueryVariables = (isNewPage, page) => {
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const limit = isNewPage ? LINKS_PER_PAGE : 100;
    const sort = { createdAt: 'desc' };
    return { limit, skip, sort };
  };
  const { data, loading, error, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page),
    fetchPolicy: 'network-only',
  });

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const updatedLinks = _.map(prev?.feed.links, (feedLink) => {
        if (feedLink.id === subscriptionData?.data?.newVote?.link) {
          let votesClone = _.clone(feedLink.votes);
          votesClone = _.union(
            subscriptionData?.data?.newVote?.user.split(),
            votesClone
          );
          return {
            ...feedLink,
            votes: votesClone,
          };
        }
        return feedLink;
      });

      return Object.assign({}, prev, {
        feed: {
          links: [...updatedLinks],
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  const getLinksToRender = (isNewPage, data) => {
    if (isNewPage) {
      const { skip, limit, sort } = getQueryVariables(isNewPage, page);
      return {
        data: data.feed.links,
        skip,
        limit,
        sort,
      };
    }
    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return {
      data: rankedLinks,
      skip: 0,
      limit: 0,
      sort: {},
    };
  };

  return (
    <>
      {loading && <Loader />}
      {error && <pre>{JSON.stringify(data?.error, null, 2)}</pre>}
      {data && (
        <>
          {getLinksToRender(isNewPage, data).data.map((link, index) => (
            <Link
              key={link.id}
              link={link}
              index={index + pageIndex}
              skip={getLinksToRender(isNewPage, data).skip}
              limit={getLinksToRender(isNewPage, data).limit}
              sort={getLinksToRender(isNewPage, data).sort}
            />
          ))}
          {isNewPage && (
            <div className="flex ml4 mv3 gray">
              <div
                className="pointer mr2"
                onClick={() => {
                  if (page > 1) {
                    history.push(`/feed/${page - 1}`);
                  }
                }}
              >
                Previous
              </div>
              <div
                className="pointer"
                onClick={() => {
                  if (page < data.feed.total / LINKS_PER_PAGE) {
                    const nextPage = page + 1;
                    history.push(`/feed/${nextPage}`);
                  }
                }}
              >
                Next
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LinkList;
