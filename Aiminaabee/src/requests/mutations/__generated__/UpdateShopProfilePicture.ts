/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateShopProfilePicture
// ====================================================

export interface UpdateShopProfilePicture_updateShopProfilePicture {
  __typename: "Shop";
  id: number;
  picture: string;
  avatar: string;
}

export interface UpdateShopProfilePicture {
  updateShopProfilePicture: UpdateShopProfilePicture_updateShopProfilePicture;
}

export interface UpdateShopProfilePictureVariables {
  shopId: number;
  picture: string;
  avatar: string;
}
