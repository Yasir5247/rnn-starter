
import { useApolloClient } from '@apollo/client';
import { CHECK_SHOP_NAME } from '../requests/checks';


export const useCheckShop = () => {

   //apollo
   const apolloClient = useApolloClient();


   const checkShopName = async ({ shopName }) => {

      const response = await apolloClient.mutate({
         mutation: CHECK_SHOP_NAME,
         variables: { name: shopName }
      });

      return response.data.checkShopName;
   }

   return { checkShopName }

}