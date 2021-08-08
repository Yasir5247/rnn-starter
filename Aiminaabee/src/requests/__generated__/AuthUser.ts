/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthUser
// ====================================================

export interface AuthUser_authUser {
  __typename: "User";
  id: number;
  name: string;
  picture: string;
  email: string;
  avatar: string;
  dateOfBirth: any | null;
  bio: string | null;
  followersCount: number | null;
  followingCount: number | null;
  followingShopsCount: number | null;
  userLikesCount: number | null;
  userSavesCount: number | null;
  numOrders: number | null;
  numOwnedShops: number | null;
  numFriends: number | null;
}

export interface AuthUser {
  authUser: AuthUser_authUser;
}
