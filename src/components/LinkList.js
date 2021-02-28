import React from 'react';
import _ from 'lodash';
import { useQuery, gql } from '@apollo/client';
import Link from './Link';

export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          name
        }
        votes
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
        _.map(data.feed.links, (link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default LinkList;
