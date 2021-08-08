/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserLocation
// ====================================================

export interface GetUserLocation_getUserLocation_location_cords {
  __typename: "Cordinates";
  longitude: number | null;
  latitude: number | null;
}

export interface GetUserLocation_getUserLocation_location {
  __typename: "UserLocation";
  userId: number;
  userName: string;
  userAvatar: string;
  cords: GetUserLocation_getUserLocation_location_cords | null;
}

export interface GetUserLocation_getUserLocation_eror {
  __typename: "UserLocationError";
  message: string;
}

export interface GetUserLocation_getUserLocation {
  __typename: "UserLocationResponse";
  success: boolean;
  location: GetUserLocation_getUserLocation_location | null;
  eror: GetUserLocation_getUserLocation_eror | null;
}

export interface GetUserLocation {
  getUserLocation: GetUserLocation_getUserLocation;
}
