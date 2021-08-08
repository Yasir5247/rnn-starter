/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductLookup
// ====================================================

export interface GetProductLookup_getProductLookups_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface GetProductLookup_getProductLookups {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  defaultImage: string;
  category: GetProductLookup_getProductLookups_category;
  isLiked: boolean;
}

export interface GetProductLookup {
  getProductLookups: (GetProductLookup_getProductLookups | null)[] | null;
}

export interface GetProductLookupVariables {
  limit: number;
  offset: number;
}
