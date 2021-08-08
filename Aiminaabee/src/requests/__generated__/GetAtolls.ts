/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAtolls
// ====================================================

export interface GetAtolls_getAtolls {
  __typename: "Atoll";
  id: number;
  name: string;
  code: string;
}

export interface GetAtolls {
  getAtolls: (GetAtolls_getAtolls | null)[] | null;
}

export interface GetAtollsVariables {
  limit: number;
  offset: number;
}
