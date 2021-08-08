import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client';

export const SEND_USER_USER_MESSAGE = gql`
  mutation UserUserMessage($userId: Int!, $body: String!) {
    userUserMessage(userId: $userId, body: $body) {
      _id
      __typename
      text
      user {
        _id
        __typename
        name
        avatar
      }
      image
      createdAt
    }
  }
`;

//this message is sent from the shop to the user
export const SEND_SHOP_MESSAGES = gql`
  mutation SendShopMessage(
    $type: String!
    $userId: Int!
    $shopId: Int!
    $body: String!
    $image: String
  ) {
    sendShopMessage(type: $type, userId: $userId, shopId: $shopId, body: $body, image: $image) {
      _id
      __typename
      text
      user {
        _id
        __typename
        name
        avatar
      }
      image
      createdAt
    }
  }
`;

//------------------Custom Hooks--------------------------//

export function useSendMessgeToUser() {
  const [mutate, { data, error }] = useMutation(SEND_USER_USER_MESSAGE);
  return { mutate, data, error };
}
