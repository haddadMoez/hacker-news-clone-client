import { gql } from '@apollo/client';

export const FEED_QUERY = gql`
  query FeedQuery(
    $filter: String
    $limit: Int
    $skip: Int
    $sort: LinkOrderByInput
  ) {
    feed(filter: $filter, limit: $limit, skip: $skip, sort: $sort) {
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
