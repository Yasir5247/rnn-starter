/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ShopMessage
// ====================================================

export interface ShopMessage_shopMessage_user {
  __typename: "ConverUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface ShopMessage_shopMessage {
  __typename: "Conversation";
  _id: string;
  text: string;
  user: ShopMessage_shopMessage_user;
  image: string | null;
  createdAt: any;
}

export interface ShopMessage {
  shopMessage: ShopMessage_shopMessage | null;
}

export interface ShopMessageVariables {
  type: string;
  userId: number;
  shopId: number;
}
