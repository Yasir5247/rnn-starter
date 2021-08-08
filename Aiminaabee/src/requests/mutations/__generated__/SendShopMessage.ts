/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendShopMessage
// ====================================================

export interface SendShopMessage_sendShopMessage_user {
  __typename: "ConverUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface SendShopMessage_sendShopMessage {
  __typename: "Conversation";
  _id: string;
  text: string;
  user: SendShopMessage_sendShopMessage_user;
  image: string | null;
  createdAt: any;
}

export interface SendShopMessage {
  sendShopMessage: SendShopMessage_sendShopMessage;
}

export interface SendShopMessageVariables {
  type: string;
  userId: number;
  shopId: number;
  body: string;
  image?: string | null;
}
