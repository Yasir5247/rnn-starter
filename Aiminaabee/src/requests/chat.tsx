import { gql } from '@apollo/client';

export const GET_CONVERSATIONS = gql`
  query GetConversation($limit: Int!, $offset: Int!) {
    getConversations(limit: $limit, offset: $offset) {
      ... on ConverUserUser {
        _id
        __typename
        from {
          id
          __typename
          name
          avatar
        }
        to {
          id
          __typename
          name
          avatar
        }
        lastMessage
        formattedLastMessage @client
        formattedDate @client
      }
      ... on ConverUserShop {
        _id
        __typename
        from {
          id
          __typename
          name
          avatar
        }
        to {
          id
          __typename
          name
          avatar
        }
        lastMessage
        formattedLastMessage @client
        formattedDate @client
      }
      ... on ConverShopUser {
        _id
        __typename
        from {
          id
          __typename
          name
          avatar
        }
        to {
          id
          __typename
          name
          avatar
        }
        lastMessage
        formattedLastMessage @client
        formattedDate @client
      }
    }
  }
`;

export const GET_USER_CONVER_ID = gql`
  query UserConvId($userId: Int!) {
    userConvId(userId: $userId) {
      converId
    }
  }
`;

export const GET_SHOP_CONVER_ID = gql`
  query ShopConvId($userId: Int!, $shopId: Int!) {
    shopConvId(userId: $userId, shopId: $shopId) {
      converId
    }
  }
`;

export const GET_USER_USER_MESSGS = gql`
  query GetUserUserConver($convId: ID, $limit: Int!, $offset: Int!) {
    getUserUserConver(convId: $convId, limit: $limit, offset: $offset) {
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

export const GET_USER_SHOP_MESSGS = gql`
  query GetUserShopConver($convId: ID, $limit: Int!, $offset: Int!) {
    getUserShopConver(convId: $convId, limit: $limit, offset: $offset) {
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

// export const GET_SHOP_USER_MESSGS = gql`
//   query GetShopUserConver($shopId: Int!, $limit: Int!, $offset: Int!) {
//     getShopUserConver(shopId: $shopId, limit: $limit, offset: $offset) {
//       _id
//       __typename
//       text
//       user {
//         _id
//         __typename
//         name
//         avatar
//       }
//       image
//       createdAt
//     }
//   }
// `;
