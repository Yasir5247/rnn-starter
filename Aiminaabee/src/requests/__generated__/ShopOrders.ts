/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopOrders
// ====================================================

export interface ShopOrders_shopOrders_order_product {
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

export interface ShopOrders_shopOrders_order_shop {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
}

export interface ShopOrders_shopOrders_order_user {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface ShopOrders_shopOrders_order {
  __typename: "ProductOrder";
  id: number;
  status: string;
  product: ShopOrders_shopOrders_order_product[];
  shop: ShopOrders_shopOrders_order_shop;
  user: ShopOrders_shopOrders_order_user | null;
}

export interface ShopOrders_shopOrders_error {
  __typename: "OrderError";
  message: string;
}

export interface ShopOrders_shopOrders {
  __typename: "GetOrdersResponse";
  success: boolean;
  order: (ShopOrders_shopOrders_order | null)[] | null;
  error: ShopOrders_shopOrders_error | null;
}

export interface ShopOrders {
  shopOrders: ShopOrders_shopOrders;
}

export interface ShopOrdersVariables {
  shopId: number;
  limit: number;
  offset: number;
}
