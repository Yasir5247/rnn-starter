import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query GetComments($productId: Int!, $limit: Int!, $offset: Int!) {
    getComments(productId: $productId, limit: $limit, offset: $offset) {
      _id
      __typename
      text
      user {
        _id
        __typename
        name
        avatar
      }
      image
      productId
      createdAt
    }
  }
`;
