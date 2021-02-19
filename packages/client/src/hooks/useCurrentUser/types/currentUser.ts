/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUser
// ====================================================

export interface currentUser_me {
  __typename: "User";
  id: string;
  email: string;
}

export interface currentUser {
  me: currentUser_me | null;
}
