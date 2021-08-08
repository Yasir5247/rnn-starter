/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FriendsInvite
// ====================================================

export interface FriendsInvite_friendsInvite {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  wasInvited: boolean;
}

export interface FriendsInvite {
  friendsInvite: (FriendsInvite_friendsInvite | null)[] | null;
}

export interface FriendsInviteVariables {
  shopId: number;
  limit: number;
  offset: number;
}
