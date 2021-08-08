/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Followers
// ====================================================

export interface Followers_followers {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  isFollowing: boolean;
  followersCount: number | null;
  formatedUserName: string | null;
}

export interface Followers {
  followers: (Followers_followers | null)[] | null;
}

export interface FollowersVariables {
  userId: number;
  limit: number;
  offset: number;
}
