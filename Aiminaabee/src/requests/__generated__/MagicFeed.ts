/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MagicFeed
// ====================================================

export interface MagicFeed_magicFeed_Product_shop {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
  formatedShopName: string | null;
}

export interface MagicFeed_magicFeed_Product {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  defaultImage: string;
  formatedName: string | null;
  formatedPrice: number | null;
  shop: MagicFeed_magicFeed_Product_shop;
  isBookmarked: boolean;
}

export interface MagicFeed_magicFeed_Category {
  __typename: "Category";
  id: number;
  name: string;
  image: string;
}

export type MagicFeed_magicFeed = MagicFeed_magicFeed_Product | MagicFeed_magicFeed_Category;

export interface MagicFeed {
  magicFeed: MagicFeed_magicFeed[];
}

export interface MagicFeedVariables {
  limit: number;
  offset: number;
}
