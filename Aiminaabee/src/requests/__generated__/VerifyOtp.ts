/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VerifyOtp
// ====================================================

export interface VerifyOtp_verifyOtp_response {
  __typename: "OtpResponse";
  id: number;
  phone_number: string;
}

export interface VerifyOtp_verifyOtp_error {
  __typename: "OTPValidationError";
  message: string;
}

export interface VerifyOtp_verifyOtp {
  __typename: "SendOTPResponse";
  success: boolean;
  response: VerifyOtp_verifyOtp_response | null;
  error: VerifyOtp_verifyOtp_error | null;
}

export interface VerifyOtp {
  verifyOtp: VerifyOtp_verifyOtp | null;
}

export interface VerifyOtpVariables {
  phoneNumber: string;
  otpCode: string;
}
