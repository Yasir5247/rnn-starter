/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRelatedShops
// ====================================================

export interface GetRelatedShops_getRelatedShops {
  __typename: "Shop";
  id: number;
  name: string;
  picture: string;
  isShopFollowed: boolean;
}

export interface GetRelatedShops {
  getRelatedShops: GetRelatedShops_getRelatedShops[];
}

export interface GetRelatedShopsVariables {
  categoryId: number;
  limit: number;
  offset: number;
}
