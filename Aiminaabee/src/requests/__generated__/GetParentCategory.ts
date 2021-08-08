/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetParentCategory
// ====================================================

export interface GetParentCategory_getParentCategory {
  __typename: "Category";
  id: number;
  name: string;
  displayImage: string | null;
}

export interface GetParentCategory {
  getParentCategory: GetParentCategory_getParentCategory;
}

export interface GetParentCategoryVariables {
  catId: number;
}
