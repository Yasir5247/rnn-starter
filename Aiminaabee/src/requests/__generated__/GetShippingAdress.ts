/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShippingAdress
// ====================================================

export interface GetShippingAdress_getShippingAdress_island_atoll {
  __typename: "Atoll";
  id: number;
  name: string;
  code: string;
}

export interface GetShippingAdress_getShippingAdress_island {
  __typename: "Island";
  id: number;
  name: string;
  atoll: GetShippingAdress_getShippingAdress_island_atoll;
}

export interface GetShippingAdress_getShippingAdress {
  __typename: "ShippingAdress";
  id: number;
  houseName: string;
  streetName: string;
  appartment: string | null;
  floor: string | null;
  island: GetShippingAdress_getShippingAdress_island;
  phone: number;
  zipCode: string | null;
  isDefault: boolean;
}

export interface GetShippingAdress {
  getShippingAdress: (GetShippingAdress_getShippingAdress | null)[] | null;
}

export interface GetShippingAdressVariables {
  default?: boolean | null;
}
