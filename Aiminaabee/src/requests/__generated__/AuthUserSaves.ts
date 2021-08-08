/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthUserSaves
// ====================================================

export interface AuthUserSaves_authUserSaves_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface AuthUserSaves_authUserSaves {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  defaultImage: string;
  category: AuthUserSaves_authUserSaves_category;
  isLiked: boolean;
  isInCart: boolean;
}

export interface AuthUserSaves {
  authUserSaves: (AuthUserSaves_authUserSaves | null)[] | null;
}

export interface AuthUserSavesVariables {
  limit: number;
  offset: number;
}
