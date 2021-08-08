/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchUsers
// ====================================================

export interface SearchUsers_searchUsers {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  isFollowing: boolean;
  followersCount: number | null;
  formatedUserName: string | null;
}

export interface SearchUsers {
  searchUsers: SearchUsers_searchUsers[];
}

export interface SearchUsersVariables {
  searchQuery?: string | null;
  limit: number;
  offset: number;
}
