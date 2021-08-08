/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: UserMessage
// ====================================================

export interface UserMessage_userMessage_user {
  __typename: "ConverUser";
  _id: number;
  name: string;
  avatar: string;
}

export interface UserMessage_userMessage {
  __typename: "Conversation";
  _id: string;
  text: string;
  user: UserMessage_userMessage_user;
  image: string | null;
  createdAt: any;
}

export interface UserMessage {
  userMessage: UserMessage_userMessage | null;
}

export interface UserMessageVariables {
  userId: number;
}
