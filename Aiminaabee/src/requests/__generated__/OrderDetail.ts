/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderDetail
// ====================================================

export interface OrderDetail_orderDetail_order_product {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  defaultImage: string;
  orderQty: number;
  formatedTotalPrice: number | null;
  formatedName: string | null;
  formatedPrice: number | null;
}

export interface OrderDetail_orderDetail_order_shop {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
  contact: string;
}

export interface OrderDetail_orderDetail_order_user {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface OrderDetail_orderDetail_order {
  __typename: "ProductOrder";
  id: number;
  status: string;
  shippingId: number;
  subTotal: number | null;
  totalTaxPrice: number | null;
  totalPrice: number | null;
  product: OrderDetail_orderDetail_order_product[];
  shop: OrderDetail_orderDetail_order_shop;
  user: OrderDetail_orderDetail_order_user | null;
}

export interface OrderDetail_orderDetail_error {
  __typename: "OrderError";
  message: string;
}

export interface OrderDetail_orderDetail {
  __typename: "GetOrderDetailResponse";
  success: boolean;
  order: OrderDetail_orderDetail_order | null;
  error: OrderDetail_orderDetail_error | null;
}

export interface OrderDetail {
  orderDetail: OrderDetail_orderDetail;
}

export interface OrderDetailVariables {
  orderId: number;
}
