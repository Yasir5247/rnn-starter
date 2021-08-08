import { gql } from '@apollo/client';

export const IS_VALID_USER = gql`
  query IsValidUser($email: String!, $phone: String!) {
    isValidUser(email: $email, phoneNumber: $phone)
  }
`;

export const CHECK_USER_EMAIL = gql`
  query CheckUserEmail($email: String!) {
    checkUserEmail(email: $email)
  }
`;

export const CHECK_USER_NAME = gql`
  query CheckUserName($name: String!) {
    checkUserName(userName: $name)
  }
`;

export const CHECK_SHOP_NAME = gql`
  query CheckShopName($name: String!) {
    checkShopName(shopName: $name)
  }
`;
