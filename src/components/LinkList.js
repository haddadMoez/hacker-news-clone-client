import React, { useState } from 'react';
import _ from 'lodash';
import { useQuery, useLazyQuery } from '@apollo/client';

import Link from './Link';
import Search from './Search';
import Loader from 'react-loader';
import { FEED_QUERY } from '../constants/queries';

const LinkList = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [data, setData] = useState(null);
  const [
    executeSearch,
    { loading: searchLoading, error: searchError },
  ] = useLazyQuery(FEED_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => setData(data),
  });

  const { loading: feedLoading, error: feedError } = useQuery(FEED_QUERY, {
    onCompleted: (data) => setData(data),
  });
  return (
    <>
      <Search
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        executeSearch={executeSearch}
      />
      {(feedLoading || searchLoading) && <Loader />}
      {(feedError || searchError) && (
        <pre>{JSON.stringify(data?.error, null, 2)}</pre>
      )}
      {data &&
        _.map(data?.feed.links, (link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default LinkList;
