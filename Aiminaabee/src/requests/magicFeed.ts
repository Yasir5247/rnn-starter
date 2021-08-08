import { gql } from '@apollo/client';

export const GET_MAGIC_FEED = gql`
  query MagicFeed($limit: Int!, $offset: Int!) {
    magicFeed(limit: $limit, offset: $offset) @connection(key: "magicFeed") {
      ... on Product {
        id
        __typename
        name
        price
        defaultImage
        formatedName @client
        formatedPrice @client
        shop {
          id
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

export const GET_PARENT_CATEGORIES = gql`
  query GetParentCategory($catId: Int!) {
    getParentCategory(catId: $catId) {
      id
      __typename
      name
      displayImage
    }
  }
`;

export const GET_LAYOUT_TWO_PARENTS = gql`
  query GetLevelTwoParentCategory {
    getLevelTwoParentCategory {
      id
      __typename
      name
      displayImage
    }
  }
`;

export const GET_FEATURED_SHOPS = gql`
  query GetFeaturedShops {
    getFeaturedShops {
      id
      __typename
      name
      avatar
      isShopFollowed
      numProducts
      numFollowers
    }
  }
`;

export const NEAR_SHOPS_FEED = gql`
  query NearShopFeed {
    nearShopFeed {
      id
      __typename
      name
      avatar
      locationCover
      cords {
        longitude
        latitude
      }
    }
  }
`;
