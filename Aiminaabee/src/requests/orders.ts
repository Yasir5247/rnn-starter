import { gql } from '@apollo/client';

export const GET_MY_ORDERS = gql`
  query UserOrders($status: Int, $limit: Int!, $offset: Int!) {
    userOrders(status: $status, limit: $limit, offset: $offset) {
      success
      order {
        id
        __typename
        status
        product {
          id
          __typename
          name
          defaultImage
          price
          orderQty
          formatedTotalPrice @client
          formatedName @client
          formatedPrice @client
        }
        shop {
          id
          __typename
          name
          avatar
        }
      }
      error {
        message
      }
    }
  }
`;

export const GET_SHOP_ORDERS = gql`
  query ShopOrders($shopId: Int!, $limit: Int!, $offset: Int!) {
    shopOrders(shopId: $shopId, limit: $limit, offset: $offset) {
      success
      order {
        id
        __typename
        status
        product {
          id
          __typename
          name
          defaultImage
          price
          orderQty
          formatedTotalPrice @client
          formatedName @client
          formatedPrice @client
        }
        shop {
          id
          __typename
          name
          avatar
        }
        user {
          id
          __typename
          name
          avatar
        }
      }
      error {
        message
      }
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query OrderDetail($orderId: Int!) {
    orderDetail(orderId: $orderId) {
      success
      order {
        id
        __typename
        status
        shippingId
        subTotal @client
        totalTaxPrice @client
        totalPrice @client
        product {
          id
          __typename
          name
          price
          defaultImage
          orderQty
          formatedTotalPrice @client
          formatedName @client
          formatedPrice @client
        }
        shop {
          id
          __typename
          name
          avatar
          contact
        }
        user {
          id
          __typename
          name
          avatar
        }
      }
      error {
        message
      }
    }
  }
`;

export const GET_ORDER_DELIVERY_ADRESS = gql`
  query GetDeliveryAddress($shippingId: Int!) {
    getDeliveryAddress(shippingId: $shippingId) {
      id
      __typename
      houseName
      streetName
      appartment
      floor
      island {
        id
        __typename
        name
        atoll {
          id
          __typename
          name
          code
        }
      }
      phone
      zipCode
    }
  }
`;
