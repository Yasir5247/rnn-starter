/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CartPayloadInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserQtyCart
// ====================================================

export interface UpdateUserQtyCart_updateUserQtyCart_error {
  __typename: "UpdateUserQtyCartResponseError";
  message: string;
}

export interface UpdateUserQtyCart_updateUserQtyCart {
  __typename: "UpdateUserQtyCartResponse";
  success: boolean;
  error: UpdateUserQtyCart_updateUserQtyCart_error | null;
}

export interface UpdateUserQtyCart {
  updateUserQtyCart: UpdateUserQtyCart_updateUserQtyCart;
}

export interface UpdateUserQtyCartVariables {
  input?: CartPayloadInput[] | null;
}
