/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_signin_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface SignIn_signin {
  __typename: "RegisterResponse";
  token: string;
  user: SignIn_signin_user;
}

export interface SignIn {
  signin: SignIn_signin;
}

export interface SignInVariables {
  email: string;
  password: string;
}
