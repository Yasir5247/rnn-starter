/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExploreFeed
// ====================================================

export interface ExploreFeed_exploreFeed_Product_shop {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
  formatedShopName: string | null;
}

export interface ExploreFeed_exploreFeed_Product {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  stock: number;
  defaultImage: string;
  formatedName: string | null;
  formatedPrice: number | null;
  shop: ExploreFeed_exploreFeed_Product_shop;
  isBookmarked: boolean;
}

export interface ExploreFeed_exploreFeed_Category {
  __typename: "Category";
  id: number;
  name: string;
  image: string;
}

export type ExploreFeed_exploreFeed = ExploreFeed_exploreFeed_Product | ExploreFeed_exploreFeed_Category;

export interface ExploreFeed {
  exploreFeed: ExploreFeed_exploreFeed[];
}

export interface ExploreFeedVariables {
  limit: number;
  offset: number;
}
