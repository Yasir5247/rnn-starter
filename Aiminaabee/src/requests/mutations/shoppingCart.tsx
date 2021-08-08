import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { GET_SHOPPING_CART } from '../shoppingCart';

export const ADD_TO_SHOPPING_CART = gql`
  mutation AddToShoppingCart($productId: Int!) {
    addToShoppingCart(productId: $productId) {
      id
      __typename
      userQty
      product {
        id
        __typename
        name
        price
        avatar
        stock
      }
      shop {
        id
        __typename
        name
        picture
      }
      category {
        id
        __typename
        name
      }
    }
  }
`;

export const UPDATE_CART_USERQTY = gql`
  mutation UpdateUserQtyCart($input: [CartPayloadInput!]) {
    updateUserQtyCart(input: $input) {
      success
      error {
        message
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromShoppingCart($cartId: Int!) {
    removeFromShoppingCart(cartId: $cartId) {
      id
    }
  }
`;

export const INCREMENT_USER_QTY = gql`
  mutation IncrementUserQty($cartId: Int!) {
    incrementUserQty(cartId: $cartId) {
      id
      __typename
      userQty
    }
  }
`;

export const DECREMENT_USER_QTY = gql`
  mutation DecrementUserQty($cartId: Int!) {
    decrementUserQty(cartId: $cartId) {
      id
      __typename
      userQty
    }
  }
`;

export const REMOVE_ALL_FROM_CART = gql`
  mutation RemoveAllFromShoppingCart {
    removeAllFromShoppingCart {
      ok
      status
    }
  }
`;

//-------------------------------//// -------FUNCTIONS----------------------//

export function useAddToCart() {
  const [mutate, { data, error }] = useMutation(ADD_TO_SHOPPING_CART, {
    update(cache, { data: { addToShoppingCart } }) {
      //get the exsting shopping cart
      const existing: any = cache.readQuery({ query: GET_SHOPPING_CART });
      //write incoming to cache
      cache.writeQuery({
        query: GET_SHOPPING_CART,
        data: {
          ...existing,
          shoppingCart: [addToShoppingCart, ...existing.shoppingCart],
        },
      });
    },
  });
  return { mutate, data, error };
}

export function useUpdateCartUserQty() {
  const [mutate, { data, error }] = useMutation(UPDATE_CART_USERQTY);
  return { mutate, data, error };
}

export function useRemoveCartItem() {
  const [mutate, { data, error }] = useMutation(REMOVE_FROM_CART, {
    update(cache, { data }) {
      const cartItemId = data?.removeFromShoppingCart?.id;
      const existingData: any = cache.readQuery({ query: GET_SHOPPING_CART });
      cache.writeQuery({
        query: GET_SHOPPING_CART,
        data: {
          shoppingCart: existingData?.shoppingCart.filter((x: any) => x.id !== cartItemId),
        },
      });
    },
  });
  return { mutate, data, error };
}

export function useIncrementQuantity() {
  const [mutate, { data, error }] = useMutation(INCREMENT_USER_QTY);
  return { mutate, data, error };
}

export function useDecrementQuantity() {
  const [mutate, { data, error }] = useMutation(DECREMENT_USER_QTY);
  return { mutate, data, error };
}
