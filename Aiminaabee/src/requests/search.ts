import { gql } from '@apollo/client';

// @connection(key: "searchUsers", filter: ["searchUsers"])

export const SEARCH_USERS = gql`
  query SearchUsers($searchQuery: String, $limit: Int!, $offset: Int!) {
    searchUsers(searchQuery: $searchQuery, limit: $limit, offset: $offset) {
      id
      __typename
      name
      avatar
      isFollowing
      followersCount
      formatedUserName @client
    }
  }
`;

export const SEARCH_SHOPS = gql`
  query SearchShops(
    $limit: Int!
    $offset: Int!
    $sort: [Sort!]
    $searchQuery: String
    $filter: Filter
  ) {
    searchShops(
      searchQuery: $searchQuery
      limit: $limit
      offset: $offset
      sort: $sort
      filter: $filter
    ) {
      success
      shops {
        id
        __typename
        name
        picture
        isVerified
        isShopFollowed
        numFollowers
        shopPImages {
          id
          image
        }
      }
      error {
        message
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($searchQuery: String, $limit: Int!, $offset: Int!) {
    searchProducts(searchQuery: $searchQuery, limit: $limit, offset: $offset) {
      id
      __typename
      name
      defaultImage
      shop {
        id
        __typename
        name
      }
      category {
        id
        __typename
        name
      }
    }
  }
`;

export const SHOP_PICTURES = gql`
  query GetPictures($shopId: Int!) {
    getPictures(shopId: $shopId) {
      id
      __typename
      product_image
    }
  }
`;
