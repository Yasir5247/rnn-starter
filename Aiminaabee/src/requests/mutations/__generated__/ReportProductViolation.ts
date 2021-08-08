/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReportProductViolation
// ====================================================

export interface ReportProductViolation_reportProductViolation {
  __typename: "SimpleResponse";
  ok: boolean;
}

export interface ReportProductViolation {
  reportProductViolation: ReportProductViolation_reportProductViolation;
}

export interface ReportProductViolationVariables {
  productId: number;
  violationId: number;
}
