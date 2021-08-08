/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserShopConver
// ====================================================

export interface GetUserShopConver_getUserShopConver_user {
  __typename: "ConverUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface GetUserShopConver_getUserShopConver {
  __typename: "Conversation";
  _id: string;
  text: string;
  user: GetUserShopConver_getUserShopConver_user;
  image: string | null;
  createdAt: any;
}

export interface GetUserShopConver {
  getUserShopConver: (GetUserShopConver_getUserShopConver | null)[] | null;
}

export interface GetUserShopConverVariables {
  convId?: string | null;
  limit: number;
  offset: number;
}
