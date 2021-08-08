/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_getComments_user {
  __typename: "CommentUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface GetComments_getComments {
  __typename: "Comment";
  _id: string;
  text: string;
  user: GetComments_getComments_user;
  image: string | null;
  productId: number;
  createdAt: any;
}

export interface GetComments {
  getComments: GetComments_getComments[];
}

export interface GetCommentsVariables {
  productId: number;
  limit: number;
  offset: number;
}
