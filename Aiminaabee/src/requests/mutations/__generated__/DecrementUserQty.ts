/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DecrementUserQty
// ====================================================

export interface DecrementUserQty_decrementUserQty {
  __typename: "CartItem";
  id: number;
  userQty: number;
}

export interface DecrementUserQty {
  decrementUserQty: DecrementUserQty_decrementUserQty;
}

export interface DecrementUserQtyVariables {
  cartId: number;
}
