/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FollowShop
// ====================================================

export interface FollowShop_followShop {
  __typename: "Shop";
  id: number;
  isShopFollowed: boolean;
}

export interface FollowShop {
  followShop: FollowShop_followShop;
}

export interface FollowShopVariables {
  shopId: number;
  status: number;
}
