/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopDeliveryLocation
// ====================================================

export interface ShopDeliveryLocation_shopDeliveryLocation {
  __typename: "ShopDeliveryLocation";
  id: number;
  name: string;
}

export interface ShopDeliveryLocation {
  shopDeliveryLocation: ShopDeliveryLocation_shopDeliveryLocation[];
}

export interface ShopDeliveryLocationVariables {
  shopId: number;
}
