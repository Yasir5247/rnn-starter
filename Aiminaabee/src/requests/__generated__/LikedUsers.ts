/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LikedUsers
// ====================================================

export interface LikedUsers_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  isFollowing: boolean;
}

export interface LikedUsers {
  likedUsers: (LikedUsers_likedUsers | null)[] | null;
}

export interface LikedUsersVariables {
  productId: number;
  offset: number;
  limit: number;
}
