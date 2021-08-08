/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { pImageInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProduct
// ====================================================

export interface CreateProduct_createProduct {
  __typename: "Product";
  id: number;
  name: string;
}

export interface CreateProduct {
  createProduct: CreateProduct_createProduct;
}

export interface CreateProductVariables {
  shopId: number;
  categoryId: number;
  conditionId: number;
  name: string;
  description: string;
  defaultImage: string;
  avatar: string;
  price: number;
  stock: number;
  pImages: (pImageInput | null)[];
}
