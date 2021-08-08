/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: Comments
// ====================================================

export interface Comments_comments_user {
  __typename: "CommentUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface Comments_comments {
  __typename: "Comment";
  _id: string;
  text: string;
  user: Comments_comments_user;
  image: string | null;
  productId: number;
  createdAt: any;
}

export interface Comments {
  comments: Comments_comments;
}

export interface CommentsVariables {
  productId: number;
}
