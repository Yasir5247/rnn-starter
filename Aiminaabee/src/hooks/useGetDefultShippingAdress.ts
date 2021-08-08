import { useApolloClient } from '@apollo/client';

import { GET_SHIPPING_ADDRESS } from '../requests/users';
import {
  GetShippingAdress,
  GetShippingAdressVariables,
} from '../requests/__generated__/GetShippingAdress';

export const useGetDefaultShippingAdress = () => {
  //apollo
  const apolloClient = useApolloClient();

  const getDefaultShippingAdress = () => {
    //getting default shipping address out of the cache
    const getShippingAdress = apolloClient.readQuery<GetShippingAdress, GetShippingAdressVariables>(
      { query: GET_SHIPPING_ADDRESS, variables: { default: true } },
    );

    const address = getShippingAdress?.getShippingAdress ?? [];

    return {
      ...address[0],
    };
  };

  return { getDefaultShippingAdress };
};
