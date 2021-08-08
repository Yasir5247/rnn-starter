import { gql } from '@apollo/client';

export const USER_MESSAGE_SUBSCRIPTION = gql`
  subscription UserMessage($userId: Int!) {
    userMessage(userId: $userId) {
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
      createdAt
    }
  }
`;

export const SHOP_MESSAGE_SUBSCRIPTION = gql`
  subscription ShopMessage($type: String!, $userId: Int!, $shopId: Int!) {
    shopMessage(type: $type, userId: $userId, shopId: $shopId) {
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
      createdAt
    }
  }
`;
