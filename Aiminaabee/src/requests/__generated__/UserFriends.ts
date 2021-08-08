/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFriends
// ====================================================

export interface UserFriends_userFriends {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  isFollowing: boolean;
  formatedUserName: string | null;
}

export interface UserFriends {
  userFriends: (UserFriends_userFriends | null)[] | null;
}

export interface UserFriendsVariables {
  limit: number;
  offset: number;
}
