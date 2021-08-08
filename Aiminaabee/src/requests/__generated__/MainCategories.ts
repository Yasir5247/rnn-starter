/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainCategories
// ====================================================

export interface MainCategories_mainCategories_subCats {
  __typename: "Category";
  id: number;
  name: string;
  image: string;
}

export interface MainCategories_mainCategories {
  __typename: "Category";
  id: number;
  name: string;
  image: string;
  subCats: MainCategories_mainCategories_subCats[] | null;
  isSubCat: boolean;
}

export interface MainCategories {
  mainCategories: MainCategories_mainCategories[];
}
