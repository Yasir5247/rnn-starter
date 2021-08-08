import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client';

//types
import { Signup, SignupVariables } from './__generated__/Signup';
import { SignIn, SignInVariables } from './__generated__/SignIn';
import { ResetPassword, ResetPasswordVariables } from './__generated__/ResetPassword';
import { RegisterPlayerId, RegisterPlayerIdVariables } from './__generated__/RegisterPlayerId';
import {
  DeactivatePlayerId,
  DeactivatePlayerIdVariables,
} from './__generated__/DeactivatePlayerId';

import { AUTH_USER, AUTH_USER_SHOPS } from '../users';

export const CREATE_USER = gql`
  mutation Signup(
    $method: String!
    $name: String!
    $email: String!
    $password: String!
    $contact: String!
  ) {
    signup(
      registerUser: {
        method: $method
        name: $name
        email: $email
        password: $password
        contact: $contact
      }
    ) {
      token
      user {
        id
        __typename
        name
      }
    }
  }
`;

export const LOCAL_SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      __typename
      user {
        id
        name
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!, $phoneNumber: String!, $newPassword: String!) {
    resetPassword(email: $email, phoneNumber: $phoneNumber, newPassword: $newPassword) {
      success
      error {
        message
      }
    }
  }
`;

export const REGISTER_PLAYER_ID = gql`
  mutation RegisterPlayerId($playerId: String!) {
    registerPlayerId(playerId: $playerId) {
      status
    }
  }
`;

export const DE_ACTIVATE_PLAYER_ID = gql`
  mutation DeactivatePlayerId($playerId: String!) {
    deactivatePlayerId(playerId: $playerId) {
      status
    }
  }
`;

//---------------cutom hooks-------------------//

export function useLocalSignup() {
  const [mutate, { data, error, loading }] = useMutation<Signup, SignupVariables>(CREATE_USER, {
    refetchQueries: [
      { query: AUTH_USER },
      { query: AUTH_USER_SHOPS, variables: { limit: 20, offset: 0 } },
    ],
  });
  return { mutate, data, error, loading };
}

export function useSignIn() {
  const [mutate, { data, error, loading }] = useMutation<SignIn, SignInVariables>(LOCAL_SIGN_IN, {
    refetchQueries: [
      { query: AUTH_USER },
      { query: AUTH_USER_SHOPS, variables: { limit: 20, offset: 0 } },
    ],
  });
  return { mutate, data, error, loading };
}

export function useResetPassword() {
  const [mutate, { data, error, loading }] = useMutation<ResetPassword, ResetPasswordVariables>(
    RESET_PASSWORD,
  );
  return { mutate, data, error, loading };
}

export function useRegisterPlayerId() {
  const [mutate, { data, error, loading }] = useMutation<
    RegisterPlayerId,
    RegisterPlayerIdVariables
  >(REGISTER_PLAYER_ID);
  return { mutate, data, error, loading };
}

export function useDeactivatePlayerId() {
  const [mutate, { data, error, loading }] = useMutation<
    DeactivatePlayerId,
    DeactivatePlayerIdVariables
  >(DE_ACTIVATE_PLAYER_ID);
  return { mutate, data, error, loading };
}
