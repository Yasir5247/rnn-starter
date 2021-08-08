/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrederedItems } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderNotification
// ====================================================

export interface OrderNotification_orderNotification {
  __typename: "OrderNotificationResponse";
  status: boolean;
}

export interface OrderNotification {
  orderNotification: OrderNotification_orderNotification;
}

export interface OrderNotificationVariables {
  order?: OrederedItems[] | null;
}
