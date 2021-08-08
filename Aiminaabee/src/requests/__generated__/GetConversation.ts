/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetConversation
// ====================================================

export interface GetConversation_getConversations_ConverUserUser_from {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface GetConversation_getConversations_ConverUserUser_to {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface GetConversation_getConversations_ConverUserUser {
  __typename: "ConverUserUser";
  _id: string;
  from: GetConversation_getConversations_ConverUserUser_from;
  to: GetConversation_getConversations_ConverUserUser_to;
  lastMessage: string | null;
  formattedLastMessage: string | null;
  formattedDate: any | null;
}

export interface GetConversation_getConversations_ConverUserShop_from {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface GetConversation_getConversations_ConverUserShop_to {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
}

export interface GetConversation_getConversations_ConverUserShop {
  __typename: "ConverUserShop";
  _id: string;
  from: GetConversation_getConversations_ConverUserShop_from;
  to: GetConversation_getConversations_ConverUserShop_to;
  lastMessage: string | null;
  formattedLastMessage: string | null;
  formattedDate: any | null;
}

export interface GetConversation_getConversations_ConverShopUser_from {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
}

export interface GetConversation_getConversations_ConverShopUser_to {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface GetConversation_getConversations_ConverShopUser {
  __typename: "ConverShopUser";
  _id: string;
  from: GetConversation_getConversations_ConverShopUser_from;
  to: GetConversation_getConversations_ConverShopUser_to;
  lastMessage: string | null;
  formattedLastMessage: string | null;
  formattedDate: any | null;
}

export type GetConversation_getConversations = GetConversation_getConversations_ConverUserUser | GetConversation_getConversations_ConverUserShop | GetConversation_getConversations_ConverShopUser;

export interface GetConversation {
  getConversations: GetConversation_getConversations[];
}

export interface GetConversationVariables {
  limit: number;
  offset: number;
}
