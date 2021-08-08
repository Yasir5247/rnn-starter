/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteShippingAddress
// ====================================================

export interface DeleteShippingAddress_deleteShippingAddress_error {
  __typename: "DeleteResponseError";
  message: string;
}

export interface DeleteShippingAddress_deleteShippingAddress {
  __typename: "DeleteResponse";
  success: boolean;
  id: number;
  error: DeleteShippingAddress_deleteShippingAddress_error | null;
}

export interface DeleteShippingAddress {
  deleteShippingAddress: DeleteShippingAddress_deleteShippingAddress;
}

export interface DeleteShippingAddressVariables {
  shippingAddressId: number;
}
