/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchProducts
// ====================================================

export interface SearchProducts_searchProducts_shop {
  __typename: "Shop";
  id: number;
  name: string;
}

export interface SearchProducts_searchProducts_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface SearchProducts_searchProducts {
  __typename: "Product";
  id: number;
  name: string;
  defaultImage: string;
  shop: SearchProducts_searchProducts_shop;
  category: SearchProducts_searchProducts_category;
}

export interface SearchProducts {
  searchProducts: (SearchProducts_searchProducts | null)[] | null;
}

export interface SearchProductsVariables {
  searchQuery?: string | null;
  limit: number;
  offset: number;
}
