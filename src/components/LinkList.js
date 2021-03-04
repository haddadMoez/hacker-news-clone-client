import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import Link from './Link';
import Loader from 'react-loader';
import { FEED_QUERY } from '../constants/queries';

const LinkList = () => {
  const { data, loading, error } = useQuery(FEED_QUERY);
  return (
    <>
      {loading && <Loader />}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data &&
        _.map(data.feed.links, (link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default LinkList;
