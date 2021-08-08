/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateShop
// ====================================================

export interface UpdateShop_updateShop {
  __typename: "Shop";
  id: number;
  name: string;
  description: string;
  website: string | null;
  contact: string;
}

export interface UpdateShop {
  updateShop: UpdateShop_updateShop;
}

export interface UpdateShopVariables {
  shopId: number;
  description?: string | null;
  website?: string | null;
  contact?: string | null;
}
