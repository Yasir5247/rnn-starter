/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserUserConver
// ====================================================

export interface GetUserUserConver_getUserUserConver_user {
  __typename: "ConverUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface GetUserUserConver_getUserUserConver {
  __typename: "Conversation";
  _id: string;
  text: string;
  user: GetUserUserConver_getUserUserConver_user;
  image: string | null;
  createdAt: any;
}

export interface GetUserUserConver {
  getUserUserConver: (GetUserUserConver_getUserUserConver | null)[] | null;
}

export interface GetUserUserConverVariables {
  convId?: string | null;
  limit: number;
  offset: number;
}
