/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InviteFriend
// ====================================================

export interface InviteFriend_inviteFriend_user {
  __typename: "User";
  id: number;
  name: string;
  wasInvited: boolean;
}

export interface InviteFriend_inviteFriend_error {
  __typename: "InviteFriendError";
  message: string;
}

export interface InviteFriend_inviteFriend {
  __typename: "InviteFriendResult";
  success: boolean;
  user: InviteFriend_inviteFriend_user | null;
  error: InviteFriend_inviteFriend_error | null;
}

export interface InviteFriend {
  inviteFriend: InviteFriend_inviteFriend;
}

export interface InviteFriendVariables {
  shopId: number;
  userId: number;
}
