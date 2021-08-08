/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserOrders
// ====================================================

export interface UserOrders_userOrders_order_product {
  __typename: "Product";
  id: number;
  name: string;
  defaultImage: string;
  price: number;
  orderQty: number;
  formatedTotalPrice: number | null;
  formatedName: string | null;
  formatedPrice: number | null;
}

export interface UserOrders_userOrders_order_shop {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
}

export interface UserOrders_userOrders_order {
  __typename: "ProductOrder";
  id: number;
  status: string;
  product: UserOrders_userOrders_order_product[];
  shop: UserOrders_userOrders_order_shop;
}

export interface UserOrders_userOrders_error {
  __typename: "OrderError";
  message: string;
}

export interface UserOrders_userOrders {
  __typename: "GetOrdersResponse";
  success: boolean;
  order: (UserOrders_userOrders_order | null)[] | null;
  error: UserOrders_userOrders_error | null;
}

export interface UserOrders {
  userOrders: UserOrders_userOrders;
}

export interface UserOrdersVariables {
  status?: number | null;
  limit: number;
  offset: number;
}
