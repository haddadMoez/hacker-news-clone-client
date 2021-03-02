import { gql } from '@apollo/client';

export const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      link
      user
    }
  }
`;
