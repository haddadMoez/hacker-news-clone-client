import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import Link from './Link';
import { FEED_QUERY } from '../constants/queries';

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(FEED_QUERY, {
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <div>
        Search
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        <button
          onClick={() => {
            executeSearch({
              variables: { filter: searchFilter },
            });
          }}
        >
          OK
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} search />
        ))}
    </>
  );
};

export default Search;
