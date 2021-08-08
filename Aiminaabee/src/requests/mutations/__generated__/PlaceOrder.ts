/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderPayload } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PlaceOrder
// ====================================================

export interface PlaceOrder_placeOrder_orders_products {
  __typename: "Product";
  id: number;
  name: string;
  defaultImage: string;
}

export interface PlaceOrder_placeOrder_orders {
  __typename: "OrderResponsePayload";
  id: number;
  shopId: number;
  userId: number;
  products: PlaceOrder_placeOrder_orders_products[] | null;
}

export interface PlaceOrder_placeOrder_error {
  __typename: "OrderError";
  message: string;
}

export interface PlaceOrder_placeOrder {
  __typename: "PlaceOrderResponse";
  success: boolean;
  orders: (PlaceOrder_placeOrder_orders | null)[] | null;
  error: PlaceOrder_placeOrder_error | null;
}

export interface PlaceOrder {
  placeOrder: PlaceOrder_placeOrder;
}

export interface PlaceOrderVariables {
  order?: (OrderPayload | null)[] | null;
}
