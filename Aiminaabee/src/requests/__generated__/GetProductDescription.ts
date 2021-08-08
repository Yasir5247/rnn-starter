/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductDescription
// ====================================================

export interface GetProductDescription_getProductDescription {
  __typename: "ProductDescription";
  id: number;
  name: string;
}

export interface GetProductDescription {
  getProductDescription: GetProductDescription_getProductDescription;
}

export interface GetProductDescriptionVariables {
  productId: number;
}
