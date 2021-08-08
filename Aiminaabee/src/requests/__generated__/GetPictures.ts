/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPictures
// ====================================================

export interface GetPictures_getPictures {
  __typename: "ShopPictures";
  id: number;
  product_image: string;
}

export interface GetPictures {
  getPictures: (GetPictures_getPictures | null)[] | null;
}

export interface GetPicturesVariables {
  shopId: number;
}
