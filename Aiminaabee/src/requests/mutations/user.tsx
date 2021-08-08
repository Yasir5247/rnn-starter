import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

//types
import { UpdateUser, UpdateUserVariables } from './__generated__/UpdateUser';

export const UPDATE_USER = gql`
  mutation UpdateUser($name: String, $email: String, $bio: String, $dateOfBirth: Date) {
    updateUser(userInput: { name: $name, email: $email, bio: $bio, dateOfBirth: $dateOfBirth }) {
      id
      __typename
      name
      email
      bio
      dateOfBirth
    }
  }
`;

export const FOLLOW_UNFOLLOW_USER = gql`
  mutation FollowUser($userId: Int!, $status: Int!) {
    followUser(userId: $userId, status: $status) {
      id
      __typename
      name
      avatar
      isFollowing
    }
  }
`;

export const UPDATE_DOB = gql`
  mutation UpdateDateOfBirth($dob: Date!) {
    updateDateOfBirth(dob: $dob) {
      id
      __typename
      name
      dateOfBirth
    }
  }
`;

export const TOGGLE_PLAYER_ID_STATUS = '';

//------------------Custom Hooks--------------------------//

export function useToggleFollowUser() {
  const [mutate, { data, error }] = useMutation(FOLLOW_UNFOLLOW_USER);
  return { mutate, data, error };
}

export function useUpdateUser() {
  const [mutate, { data, error }] = useMutation<UpdateUser, UpdateUserVariables>(UPDATE_USER);
  return { mutate, data, error };
}

export function useUpdateUserDob() {
  const [mutate, { data, error }] = useMutation(UPDATE_DOB);
  return { mutate, data, error };
}
