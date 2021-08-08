/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReSendOtp
// ====================================================

export interface ReSendOtp_reSendOtp_response {
  __typename: "OtpResponse";
  id: number;
  phone_number: string;
}

export interface ReSendOtp_reSendOtp_error {
  __typename: "OTPValidationError";
  message: string;
}

export interface ReSendOtp_reSendOtp {
  __typename: "SendOTPResponse";
  success: boolean;
  response: ReSendOtp_reSendOtp_response | null;
  error: ReSendOtp_reSendOtp_error | null;
}

export interface ReSendOtp {
  reSendOtp: ReSendOtp_reSendOtp | null;
}

export interface ReSendOtpVariables {
  phoneNumber: string;
  id: number;
}
