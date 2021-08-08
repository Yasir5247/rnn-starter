import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client';

import { SHOP_REVEWS } from '../reviews';

export const CREATE_SHOP_REVIEW = gql`
  mutation CreateShopReview($shopId: Int!, $body: String!, $rating: Int!) {
    createShopReview(shopId: $shopId, body: $body, rating: $rating) {
      id
      __typename
      body
      rating
      user {
        id
        __typename
        name
        avatar
      }
      created
    }
  }
`;

//------------------Custom Hooks--------------------------//
export function useCreateShopReview() {
  const [mutate, { data, error }] = useMutation(CREATE_SHOP_REVIEW, {
    update(cache, { data: { createShopReview } }) {
      const existing: any = cache.readQuery({ query: SHOP_REVEWS });

      cache.writeQuery({
        query: SHOP_REVEWS,
        data: {
          ...existing,
          shopReviews: [createShopReview, ...existing.shopReviews],
        },
      });
    },
  });
  return { mutate, data, error };
}
