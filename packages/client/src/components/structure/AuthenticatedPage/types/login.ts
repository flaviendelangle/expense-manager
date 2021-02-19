/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginPayload } from "./../../../../globalTypes/api";

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login {
  __typename: "User";
  id: string;
  email: string;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  payload: LoginPayload;
}
