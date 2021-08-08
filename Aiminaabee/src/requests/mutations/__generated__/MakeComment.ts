/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MakeComment
// ====================================================

export interface MakeComment_makeComment_user {
  __typename: "CommentUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface MakeComment_makeComment {
  __typename: "Comment";
  _id: string;
  text: string;
  user: MakeComment_makeComment_user;
  image: string | null;
  productId: number;
  createdAt: any;
}

export interface MakeComment {
  makeComment: MakeComment_makeComment;
}

export interface MakeCommentVariables {
  productId: number;
  body: string;
}
