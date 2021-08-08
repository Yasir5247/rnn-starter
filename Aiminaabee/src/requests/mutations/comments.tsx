import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client';

export const MAKE_COMMENTS = gql`
  mutation MakeComment($productId: Int!, $body: String!) {
    makeComment(productId: $productId, body: $body) {
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
      productId
      createdAt
    }
  }
`;

export const TOGGLE_LIKE_COMMENTS = gql`
  mutation LikeComment($commentId: String!, $status: Int!) {
    likeComment(commentId: $commentId, status: $status) {
      _id
      __typename
      productId
      text
      image
      user {
        _id
        __typename
        name
        avatar
      }
    }
  }
`;

//------------------Custom Hooks--------------------------//
export function useMakeComment() {
  const [mutate, { data, error }] = useMutation(MAKE_COMMENTS);
  return { mutate, data, error };
}
