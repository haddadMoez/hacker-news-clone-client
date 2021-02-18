import React from 'react';
import _ from 'lodash';
import { useQuery, gql } from '@apollo/client';
import Link from './Link';

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
    <div>
      {!loading &&
        _.isEmpty(error) &&
        _.map(data.feed.links, (link) => <Link key={link.id} link={link} />)}
    </div>
  );
};

export default LinkList;
