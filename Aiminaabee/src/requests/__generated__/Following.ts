/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Following
// ====================================================

export interface Following_following {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  isFollowing: boolean;
  followersCount: number | null;
  formatedUserName: string | null;
}

export interface Following {
  following: (Following_following | null)[] | null;
}

export interface FollowingVariables {
  userId: number;
  limit: number;
  offset: number;
}
