/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserNotifications
// ====================================================

export interface UserNotifications_userNotifications_Follow_from {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  isFollowing: boolean;
}

export interface UserNotifications_userNotifications_Follow {
  __typename: "Follow";
  id: string;
  from: UserNotifications_userNotifications_Follow_from;
}

export interface UserNotifications_userNotifications_NewOrder_from {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_NewOrder_to {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_NewOrder_reference_products {
  __typename: "Product";
  id: number;
  name: string;
  defaultImage: string;
}

export interface UserNotifications_userNotifications_NewOrder_reference {
  __typename: "OrderReference";
  orderId: number;
  products: UserNotifications_userNotifications_NewOrder_reference_products[] | null;
}

export interface UserNotifications_userNotifications_NewOrder {
  __typename: "NewOrder";
  id: string;
  seenStatus: boolean;
  from: UserNotifications_userNotifications_NewOrder_from;
  to: UserNotifications_userNotifications_NewOrder_to;
  reference: UserNotifications_userNotifications_NewOrder_reference;
}

export interface UserNotifications_userNotifications_OrderShipped_from {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_OrderShipped_to {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_OrderShipped_reference {
  __typename: "OrderReference";
  orderId: number;
}

export interface UserNotifications_userNotifications_OrderShipped {
  __typename: "OrderShipped";
  id: string;
  from: UserNotifications_userNotifications_OrderShipped_from;
  to: UserNotifications_userNotifications_OrderShipped_to;
  reference: UserNotifications_userNotifications_OrderShipped_reference;
}

export interface UserNotifications_userNotifications_OrderDelivered_from {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_OrderDelivered_to {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_OrderDelivered_reference {
  __typename: "OrderReference";
  orderId: number;
}

export interface UserNotifications_userNotifications_OrderDelivered {
  __typename: "OrderDelivered";
  id: string;
  seenStatus: boolean;
  from: UserNotifications_userNotifications_OrderDelivered_from;
  to: UserNotifications_userNotifications_OrderDelivered_to;
  reference: UserNotifications_userNotifications_OrderDelivered_reference;
}

export interface UserNotifications_userNotifications_OrderCancelled_from {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_OrderCancelled_to {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_OrderCancelled_reference {
  __typename: "OrderReference";
  orderId: number;
}

export interface UserNotifications_userNotifications_OrderCancelled {
  __typename: "OrderCancelled";
  id: string;
  seenStatus: boolean;
  from: UserNotifications_userNotifications_OrderCancelled_from;
  to: UserNotifications_userNotifications_OrderCancelled_to;
  reference: UserNotifications_userNotifications_OrderCancelled_reference;
}

export interface UserNotifications_userNotifications_ShopInvite_from {
  __typename: "Shop";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_ShopInvite_to {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_ShopInvite_reference_owner {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
}

export interface UserNotifications_userNotifications_ShopInvite_reference {
  __typename: "ShopInviteReference";
  owner: UserNotifications_userNotifications_ShopInvite_reference_owner;
}

export interface UserNotifications_userNotifications_ShopInvite {
  __typename: "ShopInvite";
  id: string;
  seenStatus: boolean;
  from: UserNotifications_userNotifications_ShopInvite_from;
  to: UserNotifications_userNotifications_ShopInvite_to;
  reference: UserNotifications_userNotifications_ShopInvite_reference;
}

export type UserNotifications_userNotifications = UserNotifications_userNotifications_Follow | UserNotifications_userNotifications_NewOrder | UserNotifications_userNotifications_OrderShipped | UserNotifications_userNotifications_OrderDelivered | UserNotifications_userNotifications_OrderCancelled | UserNotifications_userNotifications_ShopInvite;

export interface UserNotifications {
  userNotifications: UserNotifications_userNotifications[];
}

export interface UserNotificationsVariables {
  limit: number;
  offset: number;
}
