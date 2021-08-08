/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FriendsNots
// ====================================================

export interface FriendsNots_friendsNots_shop {
  __typename: "Shop";
  id: number;
  name: string;
}

export interface FriendsNots_friendsNots_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface FriendsNots_friendsNots {
  __typename: "FriendsLiked";
  id: number;
  name: string;
  avatar: string;
  shop: FriendsNots_friendsNots_shop;
  likedUsers: (FriendsNots_friendsNots_likedUsers | null)[] | null;
}

export interface FriendsNots {
  friendsNots: FriendsNots_friendsNots[];
}

export interface FriendsNotsVariables {
  limit: number;
  offset: number;
}
