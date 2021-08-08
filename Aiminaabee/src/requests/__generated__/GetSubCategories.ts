/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSubCategories
// ====================================================

export interface GetSubCategories_getSubCategories {
  __typename: "Category";
  id: number;
  name: string;
  isSubCat: boolean;
}

export interface GetSubCategories {
  getSubCategories: (GetSubCategories_getSubCategories | null)[] | null;
}

export interface GetSubCategoriesVariables {
  catId: number;
}
