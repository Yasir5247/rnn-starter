/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthUserShops
// ====================================================

export interface AuthUserShops_authUserShops {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
  description: string;
  categoryId: number;
  numProducts: number;
  isShopFollowed: boolean;
  isBlocked: boolean;
}

export interface AuthUserShops {
  authUserShops: (AuthUserShops_authUserShops | null)[] | null;
}

export interface AuthUserShopsVariables {
  offset: number;
  limit: number;
}
