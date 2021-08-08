import { useApolloClient } from '@apollo/client';

//queries
import { AUTH_USER } from '../requests/users';

//custom hooks
import { useGetDefaultShippingAdress } from './useGetDefultShippingAdress';


export const useProcessOrders = () => {

   //apollo
   // const apolloClient = useApolloClient();

   //custom hooks
   const { getDefaultShippingAdress } = useGetDefaultShippingAdress();
   const defaultAddr = getDefaultShippingAdress();

   //getting auth user out of cache
   // const { authUser } = apolloClient.readQuery({ query: AUTH_USER });
   // const userId = authUser.id;

   const getOrderPayload = (cartData) => {

      const payload = cartData.map(x => {
         return {
            productId: x.product.id,
            shopId: x.shop.id,
            shippingAddressId: defaultAddr.id,
            orderQty: x.userQty,
         };
      });

      return payload;
   }

   return { getOrderPayload }

}