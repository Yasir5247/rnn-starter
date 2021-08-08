/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShopProducts
// ====================================================

export interface GetShopProducts_getShopProducts {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  defaultImage: string;
  isBookmarked: boolean;
  formatedName: string | null;
  formatedPrice: number | null;
}

export interface GetShopProducts {
  getShopProducts: (GetShopProducts_getShopProducts | null)[] | null;
}

export interface GetShopProductsVariables {
  shopId: number;
  limit?: number | null;
  offset: number;
}
