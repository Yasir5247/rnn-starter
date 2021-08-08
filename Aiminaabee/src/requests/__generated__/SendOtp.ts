/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SendOtp
// ====================================================

export interface SendOtp_sendOtp_response {
  __typename: "OtpResponse";
  id: number;
  phone_number: string;
}

export interface SendOtp_sendOtp_error {
  __typename: "OTPValidationError";
  message: string;
}

export interface SendOtp_sendOtp {
  __typename: "SendOTPResponse";
  success: boolean;
  response: SendOtp_sendOtp_response | null;
  error: SendOtp_sendOtp_error | null;
}

export interface SendOtp {
  sendOtp: SendOtp_sendOtp | null;
}

export interface SendOtpVariables {
  phoneNumber: string;
}
