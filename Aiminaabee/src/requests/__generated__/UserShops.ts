/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserShops
// ====================================================

export interface UserShops_userShops {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
  description: string;
  numProducts: number;
  isShopFollowed: boolean;
  isBlocked: boolean;
}

export interface UserShops {
  userShops: (UserShops_userShops | null)[] | null;
}

export interface UserShopsVariables {
  userId: number;
  offset: number;
  limit: number;
}
