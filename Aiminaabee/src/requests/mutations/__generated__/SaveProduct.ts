/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveProduct
// ====================================================

export interface SaveProduct_saveProduct {
  __typename: "Product";
  id: number;
  isBookmarked: boolean;
}

export interface SaveProduct {
  saveProduct: SaveProduct_saveProduct;
}

export interface SaveProductVariables {
  productId: number;
  status: number;
}
