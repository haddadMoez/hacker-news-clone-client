import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import Loader from 'react-loader';

import { FEED_QUERY } from '../constants/queries';
import { CREATE_LINK_MUTATION } from '../constants/mutations';

const CreateLink = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({
    description: '',
    url: '',
  });

  const [createLink, { loading }] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update(cache, { data: { post } }) {
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
      });
      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...feed.links],
          },
        },
      });
    },
    onCompleted: () => history.push('/'),
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          setError(message)
        );

      if (networkError) setError(networkError);
    },
  });

  return (
    <>
      {error && <pre>{error}</pre>}
      <div>
        {loading && <Loader />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createLink();
          }}
        >
          <div className="flex flex-column mt3">
            <input
              className="mb2"
              value={formState.description}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  description: e.target.value,
                })
              }
              type="text"
              placeholder="A description for the link"
            />
            <input
              className="mb2"
              value={formState.url}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  url: e.target.value,
                })
              }
              type="text"
              placeholder="The URL for the link"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateLink;
