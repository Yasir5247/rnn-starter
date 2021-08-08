/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserLocation
// ====================================================

export interface UpdateUserLocation_updateUserLocation {
  __typename: "Response";
  ok: boolean;
}

export interface UpdateUserLocation {
  updateUserLocation: UpdateUserLocation_updateUserLocation;
}

export interface UpdateUserLocationVariables {
  longitude: number;
  latitude: number;
}
