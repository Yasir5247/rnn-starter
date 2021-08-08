import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { GET_MY_ORDERS } from '../orders';

export const PLACE_ORDER = gql`
  mutation PlaceOrder($order: [OrderPayload]) {
    placeOrder(order: $order) {
      success
      orders {
        __typename
        id
        shopId
        userId
        products {
          id
          name
          defaultImage
        }
      }
      error {
        message
      }
    }
  }
`;

export const PLACE_ORDER_NOTIFICATION = gql`
  mutation OrderNotification($order: [OrederedItems!]) {
    orderNotification(order: $order) {
      status
    }
  }
`;

export const CHANGE_ORDER_STATUS = gql`
  mutation ChangeOrderStatus($orderId: ID!, $status: String!) {
    changeOrderStatus(orderId: $orderId, status: $status) {
      success
      order {
        id
        __typename
        status
      }
      error {
        message
      }
    }
  }
`;

//------------------Custom Hooks--------------------------//

export function usePlaceOrder() {
  const [mutate, { data, error }] = useMutation(PLACE_ORDER, {
    update(cache, { data: { placeOrder } }) {
      //new orders
      // const newOrders = placeOrder.orders;
      //existing orders in the cache
      // const existing = cache.readQuery({ query: GET_MY_ORDERS });
      //update cache
      // cache.writeQuery({
      //    query: GET_MY_ORDERS,
      //    data: {
      //       ...existing,
      //       order: [...newOrders, ...existing.userOrders.order]
      //    },
      // });
      //remove the items from shopping cart
      cache.evict({ fieldName: 'shoppingCart' });
    },
  });
  return { mutate, data, error };
}

export function usePlaceOrderNotification() {
  const [mutate, { data, error }] = useMutation(PLACE_ORDER_NOTIFICATION);
  return { mutate, data, error };
}

export function useChangeOrderStatus() {
  const [mutate, { data, error }] = useMutation(CHANGE_ORDER_STATUS);
  return { mutate, data, error };
}
