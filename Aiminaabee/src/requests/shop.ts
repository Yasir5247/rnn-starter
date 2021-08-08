import { gql } from '@apollo/client';
import { SHOP_FRAGMENT, PRODUCT_FRAGMENT, USER_FRAGMENT } from './fragments/fragments';

export const GET_SINGLE_SHOP = gql`
  query GetSingleShop($shopId: Int!) {
    getSingleShop(shopId: $shopId) {
      id
      __typename
      name
      avatar
      contact
      website
      description
      categoryId
      numProducts
      numFollowers
      isShopFollowed
      isVerified
      conversationId
      # isMyShop @client
    }
  }
`;

export const GET_SHOP_PRODUCTS = gql`
  query GetShopProducts($shopId: Int!, $limit: Int, $offset: Int!) {
    getShopProducts(shopId: $shopId, limit: $limit, offset: $offset) {
      id
      __typename
      name
      price
      defaultImage
      isBookmarked
      formatedName @client
      formatedPrice @client
    }
  }
`;

export const GET_INVENTORY = gql`
  query GetShopInventory($shopId: Int!, $limit: Int!, $offset: Int!, $sort: [Sort!]) {
    getShopInventory(shopId: $shopId, limit: $limit, offset: $offset, sort: $sort) {
      success
      products {
        id
        __typename
        name
        price
        stock
        defaultImage
        formatedName @client
        formatedPrice @client
      }
      error {
        message
      }
    }
  }
`;

export const GET_SHOP_FOLLOWERS = gql`
  query GetShopFollowers($shopId: Int!, $limit: Int!, $offset: Int!) {
    getShopFollowers(shopId: $shopId, limit: $limit, offset: $offset) {
      id
      __typename
      name
      avatar
      isFollowing
    }
  }
`;

export const SHOP_LOCATION = gql`
  query GetShopLocation($shopId: Int!) {
    getShopLocation(shopId: $shopId) {
      _id
      shopId
      shopName
      shopPicture
      cords {
        longitude
        latitude
      }
    }
  }
`;

export const GET_RELATED_SHOPS = gql`
  query GetRelatedShops($categoryId: Int!, $limit: Int!, $offset: Int!) {
    getRelatedShops(categoryId: $categoryId, limit: $limit, offset: $offset) {
      id
      __typename
      name
      picture
      isShopFollowed
    }
  }
`;

export const INVITE_FRIENDS = gql`
  query FriendsInvite($shopId: Int!, $limit: Int!, $offset: Int!) {
    friendsInvite(shopId: $shopId, limit: $limit, offset: $offset)
      @connection(key: "friendsInvite") {
      id
      __typename
      name
      avatar
      wasInvited
    }
  }
`;

export const SHOP_DELIVERY_LOCATION = gql`
  query ShopDeliveryLocation($shopId: Int!) {
    shopDeliveryLocation(shopId: $shopId) {
      id
      name
    }
  }
`;
