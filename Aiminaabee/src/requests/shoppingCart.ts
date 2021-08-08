import { gql } from '@apollo/client';

export const GET_SHOPPING_CART = gql`
  query ShoppingCart($limit: Int!, $offset: Int!) {
    shoppingCart(limit: $limit, offset: $offset) @connection(key: "shoppingCart") {
      id
      __typename
      userQty
      subTotal @client
      product {
        id
        __typename
        name
        price
        avatar
        stock
        formatedName @client
        formatedPrice @client
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
    cartSummary @client {
      subTotal
      totTaxPrice
      finalPrice
    }
  }
`;
