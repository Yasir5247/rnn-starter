import { gql } from '@apollo/client';
import { USER_FRAGMENT, SHOP_FRAGMENT } from './fragments/fragments';

//good change
export const AUTH_USER = gql`
  query AuthUser {
    authUser {
      id
      __typename
      name
      picture
      email
      avatar
      dateOfBirth
      bio
      followersCount
      followingCount
      followingShopsCount
      userLikesCount
      userSavesCount
      numOrders
      numOwnedShops
      numFriends
    }
  }
`;

export const OTHER_USER = gql`
  query OtherUser($userId: Int!) {
    otherUser(userId: $userId) {
      id
      __typename
      name
      picture
      email
      avatar
      dateOfBirth
      bio
      followersCount
      followingCount
      followingShopsCount
      userLikesCount
      userSavesCount
      numOrders
      numOwnedShops
      isFollowing
      conversationId
    }
  }
`;

export const AUTH_USER_SHOPS = gql`
  query AuthUserShops($offset: Int!, $limit: Int!) {
    authUserShops(offset: $offset, limit: $limit) @connection(key: "authUserShops") {
      id
      __typename
      name
      avatar
      description
      categoryId
      numProducts
      isShopFollowed
      isBlocked
    }
  }
`;

export const USER_SHOPS = gql`
  query UserShops($userId: Int!, $offset: Int!, $limit: Int!) {
    userShops(userId: $userId, offset: $offset, limit: $limit) @connection(key: "userShops") {
      id
      __typename
      name
      avatar
      description
      numProducts
      isShopFollowed
      isBlocked
    }
  }
`;

export const FOLLOWERS = gql`
  query Followers($userId: Int!, $limit: Int!, $offset: Int!) {
    followers(userId: $userId, limit: $limit, offset: $offset) @connection(key: "followers") {
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

export const FOLLOWING = gql`
  query Following($userId: Int!, $limit: Int!, $offset: Int!) {
    following(userId: $userId, limit: $limit, offset: $offset) {
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

export const FOLLOWING_SHOPS = gql`
  query FollowingShops($userId: Int!, $limit: Int!, $offset: Int!) {
    followingshops(userId: $userId, limit: $limit, offset: $offset)
      @connection(key: "followingshops") {
      id
      __typename
      name
      picture
      avatar
      isShopFollowed
      numProducts
    }
  }
`;

export const USER_LIKES = gql`
  query UserLikes($userId: Int!, $limit: Int!, $offset: Int!) {
    userLikes(userId: $userId, limit: $limit, offset: $offset) @connection(key: "userLikes") {
      id
      __typename
      name
      price
      defaultImage
      category {
        id
        __typename
        name
      }
      isLiked
      isInCart
    }
  }
`;

export const AUTH_USER_SAVES = gql`
  query AuthUserSaves($limit: Int!, $offset: Int!) {
    authUserSaves(limit: $limit, offset: $offset) @connection(key: "authUserSaves") {
      id
      __typename
      name
      price
      defaultImage
      category {
        id
        __typename
        name
      }
      isLiked
      isInCart
    }
  }
`;

export const USER_FRIENDS = gql`
  query UserFriends($limit: Int!, $offset: Int!) {
    userFriends(limit: $limit, offset: $offset) @connection(key: "userFriends") {
      id
      __typename
      name
      avatar
      isFollowing
      formatedUserName @client
    }
  }
`;

export const GET_SHIPPING_ADDRESS = gql`
  query GetShippingAdress($default: Boolean) {
    getShippingAdress(default: $default) @connection(key: "getShippingAdress") {
      id
      __typename
      houseName
      streetName
      appartment
      floor
      island {
        id
        __typename
        name
        atoll {
          id
          __typename
          name
          code
        }
      }
      phone
      zipCode
      isDefault
    }
  }
`;

export const GET_ISLANDS = gql`
  query GetIslands($searchQuery: String, $limit: Int!, $offset: Int!) {
    getIslands(searchQuery: $searchQuery, limit: $limit, offset: $offset) {
      id
      __typename
      name
      atoll {
        id
        __typename
        name
        code
      }
    }
  }
`;

export const GET_ATOLLS = gql`
  query GetAtolls($limit: Int!, $offset: Int!) {
    getAtolls(limit: $limit, offset: $offset) {
      id
      __typename
      name
      code
    }
  }
`;

export const GET_USER_LOCATION = gql`
  query GetUserLocation {
    getUserLocation {
      success
      location {
        userId
        userName
        userAvatar
        cords {
          longitude
          latitude
        }
      }
      eror {
        message
      }
    }
  }
`;
