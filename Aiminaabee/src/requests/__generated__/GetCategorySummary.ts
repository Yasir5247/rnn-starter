/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategorySummary
// ====================================================

export interface GetCategorySummary_getCategorySummary {
  __typename: "Category";
  id: number;
  name: string;
  displayImage: string | null;
}

export interface GetCategorySummary {
  getCategorySummary: (GetCategorySummary_getCategorySummary | null)[] | null;
}

export interface GetCategorySummaryVariables {
  catId: number;
  limit: number;
  offset: number;
}
