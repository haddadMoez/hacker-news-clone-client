import { gql } from '@apollo/client';

export const FEED_QUERY = gql`
  query FeedQuery($filter: String) {
    feed(filter: $filter) {
      id
      count
      total
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
