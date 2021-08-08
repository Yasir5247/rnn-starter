/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateShopLocation
// ====================================================

export interface UpdateShopLocation_updateShopLocation {
  __typename: "ShopFollowResponse";
  status: boolean;
}

export interface UpdateShopLocation {
  updateShopLocation: UpdateShopLocation_updateShopLocation;
}

export interface UpdateShopLocationVariables {
  shopId: number;
  longitude: number;
  latitude: number;
}
