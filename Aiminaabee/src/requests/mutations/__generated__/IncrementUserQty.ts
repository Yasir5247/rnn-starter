/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: IncrementUserQty
// ====================================================

export interface IncrementUserQty_incrementUserQty {
  __typename: "CartItem";
  id: number;
  userQty: number;
}

export interface IncrementUserQty {
  incrementUserQty: IncrementUserQty_incrementUserQty;
}

export interface IncrementUserQtyVariables {
  cartId: number;
}
