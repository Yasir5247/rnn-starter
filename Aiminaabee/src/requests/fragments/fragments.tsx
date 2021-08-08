import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    name
    picture
    email
    avatar
    dateOfBirth
    bio
  }
`;

export const SHOP_FRAGMENT = gql`
  fragment ShopFragment on Shop {
    name
    avatar
    description
  }
`;

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    name
    price
    stock
    defaultImage
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    name
    image
  }
`;
