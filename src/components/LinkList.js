import React from 'react';
import _ from 'lodash';
import { useQuery, gql } from '@apollo/client';
import Link from './Link';
import { getSession } from '../utils/session';

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const LinkList = () => {
  const { data, loading, error } = useQuery(FEED_QUERY);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data &&
        _.map(data.feed.links, (link) => <Link key={link.id} link={link} />)}
    </>
  );
};

export default LinkList;
