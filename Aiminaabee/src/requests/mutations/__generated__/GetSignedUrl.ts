/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: GetSignedUrl
// ====================================================

export interface GetSignedUrl_signS3 {
  __typename: "S3Payload";
  signedRequest: string;
  url: string;
}

export interface GetSignedUrl {
  signS3: GetSignedUrl_signS3[];
}

export interface GetSignedUrlVariables {
  file: (FileInput | null)[];
}
