/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategory
// ====================================================

export interface GetCategory_getCategory {
  __typename: "Category";
  id: number;
  name: string;
}

export interface GetCategory {
  getCategory: GetCategory_getCategory;
}

export interface GetCategoryVariables {
  catId: number;
}
