import { gql } from '@apollo/client';

export const SEND_OTP = gql`
  query SendOtp($phoneNumber: String!) {
    sendOtp(phoneNumber: $phoneNumber) {
      success
      response {
        id
        phone_number
      }
      error {
        message
      }
    }
  }
`;

export const RESEND_OTP = gql`
  query ReSendOtp($phoneNumber: String!, $id: Int!) {
    reSendOtp(phoneNumber: $phoneNumber, id: $id) {
      success
      response {
        id
        phone_number
      }
      error {
        message
      }
    }
  }
`;

export const VERIFY_OTP = gql`
  query VerifyOtp($phoneNumber: String!, $otpCode: String!) {
    verifyOtp(phoneNumber: $phoneNumber, otpCode: $otpCode) {
      success
      response {
        id
        phone_number
      }
      error {
        message
      }
    }
  }
`;
