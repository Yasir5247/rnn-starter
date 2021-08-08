/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LikeComment
// ====================================================

export interface LikeComment_likeComment_user {
  __typename: "CommentUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface LikeComment_likeComment {
  __typename: "Comment";
  _id: string;
  productId: number;
  text: string;
  image: string | null;
  user: LikeComment_likeComment_user;
}

export interface LikeComment {
  likeComment: LikeComment_likeComment;
}

export interface LikeCommentVariables {
  commentId: string;
  status: number;
}
