/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserUserMessage
// ====================================================

export interface UserUserMessage_userUserMessage_user {
  __typename: "ConverUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface UserUserMessage_userUserMessage {
  __typename: "Conversation";
  _id: string;
  text: string;
  user: UserUserMessage_userUserMessage_user;
  image: string | null;
  createdAt: any;
}

export interface UserUserMessage {
  userUserMessage: UserUserMessage_userUserMessage;
}

export interface UserUserMessageVariables {
  userId: number;
  body: string;
}
