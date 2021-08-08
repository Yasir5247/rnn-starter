import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { GET_SHIPPING_ADDRESS } from '../users';

export const ADD_SHIPPING_ADRESS = gql`
  mutation AddShippingAddress(
    $houseName: String!
    $streetName: String!
    $appartment: String
    $floor: String
    $islandId: Int!
    $phone: String!
    $zipCode: String
  ) {
    addShippingAddress(
      input: {
        houseName: $houseName
        streetName: $streetName
        appartment: $appartment
        floor: $floor
        islandId: $islandId
        phone: $phone
        zipCode: $zipCode
      }
    ) {
      success
      payload {
        id
        __typename
        houseName
        streetName
        appartment
        floor
        phone
        zipCode
      }
      error {
        message
      }
    }
  }
`;

export const REMOVE_SHIPPING_ADDRESS = gql`
  mutation DeleteShippingAddress($shippingAddressId: Int!) {
    deleteShippingAddress(shippingAddressId: $shippingAddressId) {
      success
      id
      error {
        message
      }
    }
  }
`;

export const SET_DEFAULT_SHIPPING_ADRESS = gql`
  mutation SetDefaultShippingAdress($shippingAdressId: Int!) {
    setDefaultShippingAdress(shippingAddressId: $shippingAdressId) {
      ok
    }
  }
`;

//------------------Custom Hooks--------------------------//

export function useAddShippingAdress() {
  const [mutate, { data, error }] = useMutation(ADD_SHIPPING_ADRESS, {
    update(cache, { data: { addShippingAddress } }) {
      const incomming = addShippingAddress.payload;
      const existing: any = cache.readQuery({ query: GET_SHIPPING_ADDRESS });
      cache.writeQuery({
        query: GET_SHIPPING_ADDRESS,
        data: {
          ...existing,
          getShippingAdress: [incomming, ...existing.getShippingAdress],
        },
      });
    },
  });
  return { mutate, data, error };
}

export function useRemoveShippingAdress() {
  const [mutate, { data, error }] = useMutation(REMOVE_SHIPPING_ADDRESS, {
    update: (cache, { data }) => {
      const deletedId = data?.deleteShippingAddress?.id;
      const existingData: any = cache.readQuery({ query: GET_SHIPPING_ADDRESS });
      cache.writeQuery({
        query: GET_SHIPPING_ADDRESS,
        data: {
          getShippingAdress: [
            existingData?.getShippingAdress.filter((x: any) => x.id !== deletedId),
          ],
        },
      });
    },
  });
  return { mutate, data, error };
}

export function useSetDefaultShippingAdress() {
  const [mutate, { data, error }] = useMutation(SET_DEFAULT_SHIPPING_ADRESS, {
    refetchQueries: [{ query: GET_SHIPPING_ADDRESS, variables: { limit: 10, offset: 0 } }],
  });
  return { mutate, data, error };
}
