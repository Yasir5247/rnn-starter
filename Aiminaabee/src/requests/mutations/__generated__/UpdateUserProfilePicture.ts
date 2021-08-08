/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserProfilePicture
// ====================================================

export interface UpdateUserProfilePicture_updateUserProfilePicture {
  __typename: "User";
  id: number;
  picture: string;
  avatar: string;
}

export interface UpdateUserProfilePicture {
  updateUserProfilePicture: UpdateUserProfilePicture_updateUserProfilePicture;
}

export interface UpdateUserProfilePictureVariables {
  userId: number;
  picture: string;
  avatar: string;
}
