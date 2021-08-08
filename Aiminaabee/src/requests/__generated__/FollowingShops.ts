/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FollowingShops
// ====================================================

export interface FollowingShops_followingshops {
  __typename: "Shop";
  id: number;
  name: string;
  picture: string;
  avatar: string;
  isShopFollowed: boolean;
  numProducts: number;
}

export interface FollowingShops {
  followingshops: (FollowingShops_followingshops | null)[] | null;
}

export interface FollowingShopsVariables {
  userId: number;
  limit: number;
  offset: number;
}
