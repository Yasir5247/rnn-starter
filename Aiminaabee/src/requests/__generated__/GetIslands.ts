/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIslands
// ====================================================

export interface GetIslands_getIslands_atoll {
  __typename: "Atoll";
  id: number;
  name: string;
  code: string;
}

export interface GetIslands_getIslands {
  __typename: "Island";
  id: number;
  name: string;
  atoll: GetIslands_getIslands_atoll;
}

export interface GetIslands {
  getIslands: (GetIslands_getIslands | null)[] | null;
}

export interface GetIslandsVariables {
  searchQuery?: string | null;
  limit: number;
  offset: number;
}
