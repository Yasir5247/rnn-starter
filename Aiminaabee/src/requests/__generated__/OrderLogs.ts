/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderLogs
// ====================================================

export interface OrderLogs_orderLogs_log {
  __typename: "OrderLog";
  _id: string;
  type: string;
  orderId: number;
  remarks: string;
  created: any;
  formattedDate: any | null;
}

export interface OrderLogs_orderLogs_error {
  __typename: "OrderLogError";
  message: string;
}

export interface OrderLogs_orderLogs {
  __typename: "OrderLogResponse";
  success: boolean;
  log: OrderLogs_orderLogs_log[];
  error: OrderLogs_orderLogs_error | null;
}

export interface OrderLogs {
  orderLogs: OrderLogs_orderLogs;
}

export interface OrderLogsVariables {
  orderId: number;
  limit: number;
  offset: number;
}
