/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PopularShopOwners
// ====================================================

export interface PopularShopOwners_popularShopOwners {
  __typename: "User";
  id: number;
  name: string;
  avatar: string;
  isFollowing: boolean;
  followersCount: number | null;
}

export interface PopularShopOwners {
  popularShopOwners: PopularShopOwners_popularShopOwners[];
}
