/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShopFollowers
// ====================================================

export interface GetShopFollowers_getShopFollowers {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  isFollowing: boolean;
}

export interface GetShopFollowers {
  getShopFollowers: (GetShopFollowers_getShopFollowers | null)[] | null;
}

export interface GetShopFollowersVariables {
  shopId: number;
  limit: number;
  offset: number;
}
