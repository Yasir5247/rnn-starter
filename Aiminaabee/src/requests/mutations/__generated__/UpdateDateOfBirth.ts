/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateDateOfBirth
// ====================================================

export interface UpdateDateOfBirth_updateDateOfBirth {
  __typename: "User";
  id: number;
  name: string;
  dateOfBirth: any | null;
}

export interface UpdateDateOfBirth {
  updateDateOfBirth: UpdateDateOfBirth_updateDateOfBirth;
}

export interface UpdateDateOfBirthVariables {
  dob: any;
}
