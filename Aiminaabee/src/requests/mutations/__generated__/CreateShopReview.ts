/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateShopReview
// ====================================================

export interface CreateShopReview_createShopReview_user {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface CreateShopReview_createShopReview {
  __typename: "ShopReview";
  id: string;
  body: string;
  rating: number;
  user: CreateShopReview_createShopReview_user;
  created: any;
}

export interface CreateShopReview {
  createShopReview: CreateShopReview_createShopReview | null;
}

export interface CreateShopReviewVariables {
  shopId: number;
  body: string;
  rating: number;
}
