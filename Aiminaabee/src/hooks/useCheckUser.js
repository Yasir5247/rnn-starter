
import { useApolloClient } from '@apollo/client';
import { IS_VALID_USER, CHECK_USER_NAME, CHECK_USER_EMAIL } from '../requests/checks';


export const useCheckUser = () => {

   //apollo
   const apolloClient = useApolloClient();

   const checkUserName = async ({ userName }) => {

      const userNameResponse = await apolloClient.mutate({
         mutation: CHECK_USER_NAME,
         variables: { userName }
      });

      return userNameResponse.data.checkUserName;
   }

   const checkUserEmail = async ({ email }) => {

      const userEmailResponse = await apolloClient.mutate({
         mutation: CHECK_USER_EMAIL,
         variables: { email }
      });

      return userEmailResponse.data.checkUserEmail;
   }

   const checkUserValidity = async ({ email, phone }) => {

      const validUserResponse = await apolloClient.mutate({
         mutation: IS_VALID_USER,
         variables: { email, phone }
      });

      return validUserResponse.data.isValidUser;
   }

   return { checkUserName, checkUserEmail, checkUserValidity }

}