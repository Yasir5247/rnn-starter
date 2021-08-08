/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShoppingCart
// ====================================================

export interface ShoppingCart_shoppingCart_product {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  avatar: string;
  stock: number;
  formatedName: string | null;
  formatedPrice: number | null;
}

export interface ShoppingCart_shoppingCart_shop {
  __typename: "Shop";
  id: number;
  name: string;
  picture: string;
}

export interface ShoppingCart_shoppingCart_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface ShoppingCart_shoppingCart {
  __typename: "CartItem";
  id: number;
  userQty: number;
  subTotal: number | null;
  product: ShoppingCart_shoppingCart_product;
  shop: ShoppingCart_shoppingCart_shop;
  category: ShoppingCart_shoppingCart_category;
}

export interface ShoppingCart_cartSummary {
  __typename: "CartSummary";
  subTotal: number | null;
  totTaxPrice: number | null;
  finalPrice: number | null;
}

export interface ShoppingCart {
  shoppingCart: (ShoppingCart_shoppingCart | null)[] | null;
  cartSummary: ShoppingCart_cartSummary;
}

export interface ShoppingCartVariables {
  limit: number;
  offset: number;
}
