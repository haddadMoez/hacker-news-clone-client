import { gql } from '@apollo/client';

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      postedBy {
        id
      }
    }
  }
`;

export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      link
      user
    }
  }
`;
