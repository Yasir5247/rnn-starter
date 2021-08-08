/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  bio: string | null;
  dateOfBirth: any | null;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  name?: string | null;
  email?: string | null;
  bio?: string | null;
  dateOfBirth?: any | null;
}
