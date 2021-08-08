/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LikeProduct
// ====================================================

export interface LikeProduct_likeProduct {
  __typename: "Product";
  id: number;
  isLiked: boolean;
  numLikes: number;
}

export interface LikeProduct {
  likeProduct: LikeProduct_likeProduct;
}

export interface LikeProductVariables {
  productId: number;
  status: number;
}
