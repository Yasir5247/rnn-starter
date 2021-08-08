import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import {
  UpdateUserProfilePicture,
  UpdateUserProfilePictureVariables,
} from '../mutations/__generated__/UpdateUserProfilePicture';

//update user profile picture
export const UPDATE_USER_PROFILE_PICTURE = gql`
  mutation UpdateUserProfilePicture($userId: Int!, $picture: String!, $avatar: String!) {
    updateUserProfilePicture(userId: $userId, picture: $picture, avatar: $avatar) {
      id
      __typename
      picture
      avatar
    }
  }
`;

//update shop profile picture
export const UPDATE_SHOP_PROFILE_PICTURE = gql`
  mutation UpdateShopProfilePicture($shopId: Int!, $picture: String!, $avatar: String!) {
    updateShopProfilePicture(shopId: $shopId, picture: $picture, avatar: $avatar) {
      id
      __typename
      picture
      avatar
    }
  }
`;

//update user location
export const UPDATE_USER_LOCATION = gql`
  mutation UpdateUserLocation($longitude: Float!, $latitude: Float!) {
    updateUserLocation(longitude: $longitude, latitude: $latitude) {
      ok
    }
  }
`;

//--------------------hooks--------------------------//
export function useUpdateShopPicture() {
  const [mutate, { data, error }] = useMutation(UPDATE_SHOP_PROFILE_PICTURE);
  return { mutate, data, error };
}

export function useUpdateUserProfilePicture() {
  const [mutate, { data, error }] = useMutation<
    UpdateUserProfilePicture,
    UpdateUserProfilePictureVariables
  >(UPDATE_USER_PROFILE_PICTURE);
  return { mutate, data, error };
}
