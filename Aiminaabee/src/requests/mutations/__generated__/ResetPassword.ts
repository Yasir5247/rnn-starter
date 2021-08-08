/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_resetPassword_error {
  __typename: "ResetPasswordError";
  message: string;
}

export interface ResetPassword_resetPassword {
  __typename: "ResetPasswordResponse";
  success: boolean;
  error: ResetPassword_resetPassword_error | null;
}

export interface ResetPassword {
  resetPassword: ResetPassword_resetPassword;
}

export interface ResetPasswordVariables {
  email: string;
  phoneNumber: string;
  newPassword: string;
}
