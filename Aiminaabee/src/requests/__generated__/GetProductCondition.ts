/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductCondition
// ====================================================

export interface GetProductCondition_getProductCondition {
  __typename: "ProductCondition";
  id: number;
  name: string;
}

export interface GetProductCondition {
  getProductCondition: GetProductCondition_getProductCondition;
}

export interface GetProductConditionVariables {
  productId: number;
}
