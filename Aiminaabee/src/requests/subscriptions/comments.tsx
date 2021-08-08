import { gql } from '@apollo/client';

export const COMMENT_MESSAGE_SUBSCRIPTION = gql`
  subscription Comments($productId: Int!) {
    comments(productId: $productId) {
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
