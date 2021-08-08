/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductImages
// ====================================================

export interface GetProductImages_getProductImages {
  __typename: "ProductImage";
  id: number;
  productId: number;
  image: string;
}

export interface GetProductImages {
  getProductImages: GetProductImages_getProductImages[];
}

export interface GetProductImagesVariables {
  productId: number;
}
