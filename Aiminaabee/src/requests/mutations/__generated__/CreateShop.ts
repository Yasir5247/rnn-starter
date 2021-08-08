/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeliveryLocation } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateShop
// ====================================================

export interface CreateShop_createShop_shop {
  __typename: "Shop";
  id: number;
  name: string;
  picture: string;
  description: string;
  categoryId: number;
  numProducts: number;
  isShopFollowed: boolean;
  isBlocked: boolean;
}

export interface CreateShop_createShop_error {
  __typename: "CreateShopValidationError";
  message: string;
}

export interface CreateShop_createShop {
  __typename: "CreateShopResponse";
  success: boolean;
  shop: CreateShop_createShop_shop | null;
  error: CreateShop_createShop_error | null;
}

export interface CreateShop {
  createShop: CreateShop_createShop;
}

export interface CreateShopVariables {
  name: string;
  type: string;
  description: string;
  contact: string;
  categoryId: number;
  deliveryLocations: DeliveryLocation[];
}
