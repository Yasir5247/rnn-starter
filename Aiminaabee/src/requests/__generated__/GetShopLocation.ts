/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShopLocation
// ====================================================

export interface GetShopLocation_getShopLocation_cords {
  __typename: "Cordinates";
  longitude: number | null;
  latitude: number | null;
}

export interface GetShopLocation_getShopLocation {
  __typename: "ShopLocation";
  _id: string;
  shopId: number;
  shopName: string;
  shopPicture: string;
  cords: GetShopLocation_getShopLocation_cords | null;
}

export interface GetShopLocation {
  getShopLocation: GetShopLocation_getShopLocation;
}

export interface GetShopLocationVariables {
  shopId: number;
}
