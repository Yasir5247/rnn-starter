/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFeaturedShops
// ====================================================

export interface GetFeaturedShops_getFeaturedShops {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
  isShopFollowed: boolean;
  numProducts: number;
  numFollowers: number;
}

export interface GetFeaturedShops {
  getFeaturedShops: GetFeaturedShops_getFeaturedShops;
}
