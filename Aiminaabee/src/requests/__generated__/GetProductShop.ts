/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductShop
// ====================================================

export interface GetProductShop_getProductShop_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface GetProductShop_getProductShop {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
  owner: GetProductShop_getProductShop_owner;
}

export interface GetProductShop {
  getProductShop: GetProductShop_getProductShop;
}

export interface GetProductShopVariables {
  productId: number;
}
