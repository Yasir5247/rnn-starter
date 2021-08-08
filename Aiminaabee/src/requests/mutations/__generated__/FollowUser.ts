/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FollowUser
// ====================================================

export interface FollowUser_followUser {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  isFollowing: boolean;
}

export interface FollowUser {
  followUser: FollowUser_followUser;
}

export interface FollowUserVariables {
  userId: number;
  status: number;
}
