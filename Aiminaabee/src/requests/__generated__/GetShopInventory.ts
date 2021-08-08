/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Sort } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetShopInventory
// ====================================================

export interface GetShopInventory_getShopInventory_products {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  stock: number;
  defaultImage: string;
  formatedName: string | null;
  formatedPrice: number | null;
}

export interface GetShopInventory_getShopInventory_error {
  __typename: "InventoryValidationError";
  message: string;
}

export interface GetShopInventory_getShopInventory {
  __typename: "ShopInventoryResult";
  success: boolean;
  products: GetShopInventory_getShopInventory_products[] | null;
  error: GetShopInventory_getShopInventory_error | null;
}

export interface GetShopInventory {
  getShopInventory: GetShopInventory_getShopInventory;
}

export interface GetShopInventoryVariables {
  shopId: number;
  limit: number;
  offset: number;
  sort?: Sort[] | null;
}
