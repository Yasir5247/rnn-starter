/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteProduct
// ====================================================

export interface DeleteProduct_deleteProduct {
  __typename: "ProductDeleteResponse";
  status: boolean;
  productId: number;
}

export interface DeleteProduct {
  deleteProduct: DeleteProduct_deleteProduct;
}

export interface DeleteProductVariables {
  productId: number;
}
