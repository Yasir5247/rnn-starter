/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopReviews
// ====================================================

export interface ShopReviews_shopReviews_user {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface ShopReviews_shopReviews {
  __typename: "ShopReview";
  id: string;
  shopId: number;
  body: string;
  rating: number;
  user: ShopReviews_shopReviews_user;
  created: any;
  formattedData: any | null;
  formattedBody: string | null;
}

export interface ShopReviews {
  shopReviews: (ShopReviews_shopReviews | null)[] | null;
}

export interface ShopReviewsVariables {
  shopId: number;
  limit: number;
  offset: number;
}
