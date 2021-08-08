/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserLikes
// ====================================================

export interface UserLikes_userLikes_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface UserLikes_userLikes {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  defaultImage: string;
  category: UserLikes_userLikes_category;
  isLiked: boolean;
  isInCart: boolean;
}

export interface UserLikes {
  userLikes: (UserLikes_userLikes | null)[] | null;
}

export interface UserLikesVariables {
  userId: number;
  limit: number;
  offset: number;
}
