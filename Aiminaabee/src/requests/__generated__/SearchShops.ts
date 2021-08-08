/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Sort, Filter } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchShops
// ====================================================

export interface SearchShops_searchShops_shops_shopPImages {
  __typename: "ShopPImages";
  id: number;
  image: string;
}

export interface SearchShops_searchShops_shops {
  __typename: "Shop";
  id: number;
  name: string;
  picture: string;
  isVerified: boolean;
  isShopFollowed: boolean;
  numFollowers: number;
  shopPImages: (SearchShops_searchShops_shops_shopPImages | null)[] | null;
}

export interface SearchShops_searchShops_error {
  __typename: "SearchValidationError";
  message: string;
}

export interface SearchShops_searchShops {
  __typename: "SearchShopResponse";
  success: boolean;
  shops: SearchShops_searchShops_shops[];
  error: SearchShops_searchShops_error | null;
}

export interface SearchShops {
  searchShops: SearchShops_searchShops;
}

export interface SearchShopsVariables {
  limit: number;
  offset: number;
  sort?: Sort[] | null;
  searchQuery?: string | null;
  filter?: Filter | null;
}
