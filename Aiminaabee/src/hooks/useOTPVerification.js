
import { useApolloClient } from '@apollo/client';
import { SEND_OTP, RESEND_OTP, VERIFY_OTP } from '../requests/otpVerification';


export const useOTPVerification = () => {

   //apollo
   const apolloClient = useApolloClient();

   //send otp
   const sendOTP = async ({ phoneNumber }) => {

      const sendOTPResponse = await apolloClient.mutate({
         mutation: SEND_OTP,
         variables: { phoneNumber: phoneNumber }
      });

      return sendOTPResponse.data.sendOtp;
   }

   //verify otp
   const verifyOTP = async ({ phoneNumber, otpCode }) => {

      const verifyOTPResponse = await apolloClient.mutate({
         mutation: VERIFY_OTP,
         variables: {
            phoneNumber: phoneNumber,
            otpCode: otpCode
         }
      });

      return verifyOTPResponse.data.verifyOtp;
   }

   //resend otp
   const resendOTP = async ({ phoneNumber, id }) => {

      const resendOTPResponse = await apolloClient.mutate({
         mutation: RESEND_OTP,
         variables: {
            phoneNumber: phoneNumber,
            id: id
         }
      });

      return resendOTPResponse.data.reSendOtp;
   }

   return { sendOTP, verifyOTP, resendOTP }

}