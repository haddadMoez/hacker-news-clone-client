import React from 'react';

const Search = ({ searchFilter, setSearchFilter, executeSearch }) => {
  return (
    <>
      <div>
        Search:
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter },
            })
          }
        >
          OK
        </button>
      </div>
    </>
  );
};

export default Search;
