/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PopularShops
// ====================================================

export interface PopularShops_popularShops {
  __typename: "Shop";
  id: number;
  name: string;
  picture: string;
  isShopFollowed: boolean;
}

export interface PopularShops {
  popularShops: PopularShops_popularShops[];
}
