/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductDetail
// ====================================================

export interface ProductDetail_productDetail_Product_shop {
  __typename: "Shop";
  id: number;
  name: string;
  picture: string;
}

export interface ProductDetail_productDetail_Product {
  __typename: "Product";
  id: number;
  type: string;
  name: string;
  price: number;
  defaultImage: string;
  formatedName: string | null;
  formatedPrice: number | null;
  shop: ProductDetail_productDetail_Product_shop;
  shopId: number;
  isBookmarked: boolean;
  isLiked: boolean;
  numLikes: number;
  numComments: number;
  isInCart: boolean;
  isOwner: boolean;
}

export interface ProductDetail_productDetail_RelatedProduct {
  __typename: "RelatedProduct";
  id: number;
  type: string;
  name: string;
  price: number;
  defaultImage: string;
}

export type ProductDetail_productDetail = ProductDetail_productDetail_Product | ProductDetail_productDetail_RelatedProduct;

export interface ProductDetail {
  productDetail: ProductDetail_productDetail[] | null;
}

export interface ProductDetailVariables {
  productId: number;
  limit: number;
  offset: number;
}
