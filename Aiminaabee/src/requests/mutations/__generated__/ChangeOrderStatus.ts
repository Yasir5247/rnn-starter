/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeOrderStatus
// ====================================================

export interface ChangeOrderStatus_changeOrderStatus_order {
  __typename: "ProductOrder";
  id: number;
  status: string;
}

export interface ChangeOrderStatus_changeOrderStatus_error {
  __typename: "ChangeOrderError";
  message: string;
}

export interface ChangeOrderStatus_changeOrderStatus {
  __typename: "UpdateOrderStatusResponse";
  success: boolean;
  order: ChangeOrderStatus_changeOrderStatus_order;
  error: ChangeOrderStatus_changeOrderStatus_error | null;
}

export interface ChangeOrderStatus {
  changeOrderStatus: ChangeOrderStatus_changeOrderStatus;
}

export interface ChangeOrderStatusVariables {
  orderId: string;
  status: string;
}
