/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopConvId
// ====================================================

export interface ShopConvId_shopConvId {
  __typename: "ConverId";
  converId: string | null;
}

export interface ShopConvId {
  shopConvId: ShopConvId_shopConvId | null;
}

export interface ShopConvIdVariables {
  userId: number;
  shopId: number;
}
