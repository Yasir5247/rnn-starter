import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT, SHOP_FRAGMENT, CATEGORY_FRAGMENT } from './fragments/fragments';

export const GET_EXPLORE_FEED = gql`
  query ExploreFeed($limit: Int!, $offset: Int!) {
    exploreFeed(limit: $limit, offset: $offset) @connection(key: "exploreFeed") {
      ... on Product {
        id
        __typename
        name
        price
        stock
        defaultImage
        formatedName @client
        formatedPrice @client
        shop {
          id
          __typename
          name
          avatar
          formatedShopName @client
        }
        isBookmarked
      }
      ... on Category {
        id
        __typename
        name
        image
      }
    }
  }
`;
