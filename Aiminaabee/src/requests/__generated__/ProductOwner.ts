/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductOwner
// ====================================================

export interface ProductOwner_productOwner {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface ProductOwner {
  productOwner: ProductOwner_productOwner;
}

export interface ProductOwnerVariables {
  shopId: number;
}
