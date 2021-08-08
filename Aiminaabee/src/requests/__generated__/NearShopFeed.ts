/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NearShopFeed
// ====================================================

export interface NearShopFeed_nearShopFeed_cords {
  __typename: "Cordinates";
  longitude: number | null;
  latitude: number | null;
}

export interface NearShopFeed_nearShopFeed {
  __typename: "NearShop";
  id: number;
  name: string;
  avatar: string;
  locationCover: string;
  cords: NearShopFeed_nearShopFeed_cords | null;
}

export interface NearShopFeed {
  nearShopFeed: (NearShopFeed_nearShopFeed | null)[] | null;
}
