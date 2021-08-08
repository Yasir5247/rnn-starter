/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDeliveryAddress
// ====================================================

export interface GetDeliveryAddress_getDeliveryAddress_island_atoll {
  __typename: "Atoll";
  id: number;
  name: string;
  code: string;
}

export interface GetDeliveryAddress_getDeliveryAddress_island {
  __typename: "Island";
  id: number;
  name: string;
  atoll: GetDeliveryAddress_getDeliveryAddress_island_atoll;
}

export interface GetDeliveryAddress_getDeliveryAddress {
  __typename: "ShippingAdress";
  id: number;
  houseName: string;
  streetName: string;
  appartment: string | null;
  floor: string | null;
  island: GetDeliveryAddress_getDeliveryAddress_island;
  phone: number;
  zipCode: string | null;
}

export interface GetDeliveryAddress {
  getDeliveryAddress: GetDeliveryAddress_getDeliveryAddress;
}

export interface GetDeliveryAddressVariables {
  shippingId: number;
}
