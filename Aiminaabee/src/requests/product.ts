import { gql } from '@apollo/client';

export const PRODUCT_OWNER = gql`
  query ProductOwner($shopId: Int!) {
    productOwner(shopId: $shopId) {
      id
      __typename
      name
      avatar
    }
  }
`;

export const GET_PRODUCT_SHOP = gql`
  query GetProductShop($productId: Int!) {
    getProductShop(productId: $productId) {
      id
      __typename
      name
      avatar
      owner {
        id
        __typename
        name
      }
    }
  }
`;

export const GET_PRODUCT_CONDITION = gql`
  query GetProductCondition($productId: Int!) {
    getProductCondition(productId: $productId) {
      id
      __typename
      name
    }
  }
`;

export const GET_PRODUCT_DESCRIPTION = gql`
  query GetProductDescription($productId: Int!) {
    getProductDescription(productId: $productId) {
      id
      name
    }
  }
`;

export const GET_PRODUCT_DETAIL = gql`
  query ProductDetail($productId: Int!, $limit: Int!, $offset: Int!) {
    productDetail(productId: $productId, limit: $limit, offset: $offset)
      @connection(key: "productDetail") {
      ... on Product {
        id
        __typename
        type
        name
        price
        defaultImage
        formatedName @client
        formatedPrice @client
        shop {
          id
          __typename
          name
          picture
        }
        shopId
        isBookmarked
        isLiked
        numLikes
        numComments
        isInCart @client
        isOwner @client
      }
      ... on RelatedProduct {
        id
        __typename
        type
        name
        price
        defaultImage
      }
    }
  }
`;

export const LIKED_USERS = gql`
  query LikedUsers($productId: Int!, $offset: Int!, $limit: Int!) {
    likedUsers(productId: $productId, limit: $limit, offset: $offset) {
      id
      __typename
      name
      avatar
      isFollowing
    }
  }
`;

export const PRODUCT_LOOKUP = gql`
  query GetProductLookup($limit: Int!, $offset: Int!) {
    getProductLookups(limit: $limit, offset: $offset) {
      id
      name
      price
      defaultImage
      category {
        id
        name
      }
      isLiked
    }
  }
`;
