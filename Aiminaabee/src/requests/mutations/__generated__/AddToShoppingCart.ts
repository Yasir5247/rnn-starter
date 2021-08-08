/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToShoppingCart
// ====================================================

export interface AddToShoppingCart_addToShoppingCart_product {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  avatar: string;
  stock: number;
}

export interface AddToShoppingCart_addToShoppingCart_shop {
  __typename: "Shop";
  id: number;
  name: string;
  picture: string;
}

export interface AddToShoppingCart_addToShoppingCart_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface AddToShoppingCart_addToShoppingCart {
  __typename: "CartItem";
  id: number;
  userQty: number;
  product: AddToShoppingCart_addToShoppingCart_product;
  shop: AddToShoppingCart_addToShoppingCart_shop;
  category: AddToShoppingCart_addToShoppingCart_category;
}

export interface AddToShoppingCart {
  addToShoppingCart: AddToShoppingCart_addToShoppingCart;
}

export interface AddToShoppingCartVariables {
  productId: number;
}
