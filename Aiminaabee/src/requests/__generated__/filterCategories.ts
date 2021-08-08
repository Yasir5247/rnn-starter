/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: filterCategories
// ====================================================

export interface filterCategories_filterCategories_subCats_subCats_subCats {
  __typename: "Category";
  id: number;
  name: string;
  image: string;
}

export interface filterCategories_filterCategories_subCats_subCats {
  __typename: "Category";
  id: number;
  name: string;
  image: string;
  subCats: filterCategories_filterCategories_subCats_subCats_subCats[] | null;
}

export interface filterCategories_filterCategories_subCats {
  __typename: "Category";
  id: number;
  name: string;
  image: string;
  subCats: filterCategories_filterCategories_subCats_subCats[] | null;
}

export interface filterCategories_filterCategories {
  __typename: "Category";
  id: number;
  name: string;
  image: string;
  subCats: filterCategories_filterCategories_subCats[] | null;
}

export interface filterCategories {
  filterCategories: (filterCategories_filterCategories | null)[] | null;
}

export interface filterCategoriesVariables {
  catId: number;
}
