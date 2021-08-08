/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSingleShop
// ====================================================

export interface GetSingleShop_getSingleShop {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
  contact: string;
  website: string | null;
  description: string;
  categoryId: number;
  numProducts: number;
  numFollowers: number;
  isShopFollowed: boolean;
  isVerified: boolean;
  conversationId: string | null;
}

export interface GetSingleShop {
  getSingleShop: GetSingleShop_getSingleShop;
}

export interface GetSingleShopVariables {
  shopId: number;
}
