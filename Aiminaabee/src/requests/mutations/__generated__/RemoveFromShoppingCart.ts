/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFromShoppingCart
// ====================================================

export interface RemoveFromShoppingCart_removeFromShoppingCart {
  __typename: "CartItem";
  id: number;
}

export interface RemoveFromShoppingCart {
  removeFromShoppingCart: RemoveFromShoppingCart_removeFromShoppingCart;
}

export interface RemoveFromShoppingCartVariables {
  cartId: number;
}
