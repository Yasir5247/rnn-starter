/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddShippingAddress
// ====================================================

export interface AddShippingAddress_addShippingAddress_payload {
  __typename: "ShippingAdress";
  id: number;
  houseName: string;
  streetName: string;
  appartment: string | null;
  floor: string | null;
  phone: number;
  zipCode: string | null;
}

export interface AddShippingAddress_addShippingAddress_error {
  __typename: "AddShippingError";
  message: string;
}

export interface AddShippingAddress_addShippingAddress {
  __typename: "AddShippingResponse";
  success: boolean;
  payload: AddShippingAddress_addShippingAddress_payload | null;
  error: AddShippingAddress_addShippingAddress_error | null;
}

export interface AddShippingAddress {
  addShippingAddress: AddShippingAddress_addShippingAddress;
}

export interface AddShippingAddressVariables {
  houseName: string;
  streetName: string;
  appartment?: string | null;
  floor?: string | null;
  islandId: number;
  phone: string;
  zipCode?: string | null;
}
