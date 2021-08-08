/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetViolations
// ====================================================

export interface GetViolations_getViolations {
  __typename: "Violation";
  id: number;
  name: string;
}

export interface GetViolations {
  getViolations: GetViolations_getViolations[] | null;
}
