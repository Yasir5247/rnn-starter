import { gql } from '@apollo/client';

export const SHOP_REVEWS = gql`
  query ShopReviews($shopId: Int!, $limit: Int!, $offset: Int!) {
    shopReviews(shopId: $shopId, limit: $limit, offset: $offset) @connection(key: "shopReviews") {
      id
      __typename
      shopId
      body
      rating
      user {
        id
        __typename
        name
        avatar
      }
      created
      formattedData @client
      formattedBody @client
    }
  }
`;
