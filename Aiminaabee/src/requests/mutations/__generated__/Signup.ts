/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_signup_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface Signup_signup {
  __typename: "RegisterResponse";
  token: string;
  user: Signup_signup_user;
}

export interface Signup {
  signup: Signup_signup;
}

export interface SignupVariables {
  method: string;
  name: string;
  email: string;
  password: string;
  contact: string;
}
