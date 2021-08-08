import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client';

import { InviteFriend, InviteFriendVariables } from './__generated__/InviteFriend';
import { UpdateShop, UpdateShopVariables } from './__generated__/UpdateShop';

import { AUTH_USER_SHOPS } from '../users';

export const CREATE_SHOP = gql`
  mutation CreateShop(
    $name: String!
    $type: String!
    $description: String!
    $contact: String!
    $categoryId: Int!
    $deliveryLocations: [DeliveryLocation!]!
  ) {
    createShop(
      input: {
        name: $name
        type: $type
        description: $description
        contact: $contact
        categoryId: $categoryId
        deliveryLocations: $deliveryLocations
      }
    ) {
      success
      shop {
        id
        __typename
        name
        picture
        description
        categoryId
        numProducts
        isShopFollowed
        isBlocked
      }
      error {
        message
      }
    }
  }
`;

export const CREATE_SHOP_LOCATION_ENTRY = gql`
  mutation CreateShopLocationEntry(
    $shopId: Int!
    $picture: String!
    $avatar: String!
    $longitude: Float!
    $latitude: Float!
  ) {
    createShopLocationEntry(
      input: {
        shopId: $shopId
        picture: $picture
        avatar: $avatar
        longitude: $longitude
        latitude: $latitude
      }
    ) {
      id
      __typename
      name
    }
  }
`;

export const UPDATE_SHOP = gql`
  mutation UpdateShop($shopId: Int!, $description: String, $website: String, $contact: String) {
    updateShop(
      input: { shopId: $shopId, description: $description, website: $website, contact: $contact }
    ) {
      id
      __typename
      name
      description
      website
      contact
    }
  }
`;

export const UPDATE_SHOP_LOCATION = gql`
  mutation UpdateShopLocation($shopId: Int!, $longitude: Float!, $latitude: Float!) {
    updateShopLocation(
      locationPoint: { shopId: $shopId, longitude: $longitude, latitude: $latitude }
    ) {
      status
    }
  }
`;

export const INVTE_A_FRIEND = gql`
  mutation InviteFriend($shopId: Int!, $userId: Int!) {
    inviteFriend(shopId: $shopId, userId: $userId) {
      success
      user {
        id
        __typename
        name
        wasInvited
      }
      error {
        message
      }
    }
  }
`;

export const TOGGLE_FOLLOW_SHOP = gql`
  mutation FollowShop($shopId: Int!, $status: Int!) {
    followShop(shopId: $shopId, status: $status) {
      id
      __typename
      isShopFollowed
    }
  }
`;

//-------------cutom hooks-----------------------------//

export function useToggleFollowShop() {
  const [mutate, { data, error, loading }] = useMutation(TOGGLE_FOLLOW_SHOP);
  return { mutate, data, error, loading };
}

export function useCreateShop() {
  const [mutate, { data, error, loading }] = useMutation(CREATE_SHOP, {
    update: (cache, { data: { createShop } }) => {
      const existing: any = cache.readQuery({ query: AUTH_USER_SHOPS });
      cache.writeQuery({
        query: AUTH_USER_SHOPS,
        data: {
          ...existing,
          authUserShops: [...existing.authUserShops, createShop],
        },
      });
    },
  });
  return { mutate, data, error, loading };
}

export function useCreateShopLocationEntry() {
  const [mutate, { data, error, loading }] = useMutation(CREATE_SHOP_LOCATION_ENTRY);
  return { mutate, data, error, loading };
}

export function useInviteFriend() {
  const [mutate, { data, error, loading }] = useMutation<InviteFriend, InviteFriendVariables>(
    INVTE_A_FRIEND,
  );
  return { mutate, data, error, loading };
}

export function useUpdateShopLocation() {
  const [mutate, { data, error, loading }] = useMutation(UPDATE_SHOP_LOCATION);
  return { mutate, data, error, loading };
}

export function useUpdateShop() {
  const [mutate, { data, error, loading }] = useMutation<UpdateShop, UpdateShopVariables>(
    UPDATE_SHOP,
  );
  return { mutate, data, error, loading };
}
