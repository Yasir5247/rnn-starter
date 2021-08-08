/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateShopLocationEntry
// ====================================================

export interface CreateShopLocationEntry_createShopLocationEntry {
  __typename: "Shop";
  id: number;
  name: string;
}

export interface CreateShopLocationEntry {
  createShopLocationEntry: CreateShopLocationEntry_createShopLocationEntry;
}

export interface CreateShopLocationEntryVariables {
  shopId: number;
  picture: string;
  avatar: string;
  longitude: number;
  latitude: number;
}
