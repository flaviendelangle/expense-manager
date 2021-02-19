/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InsertUserPayload } from "./../../../../globalTypes/api";

// ====================================================
// GraphQL mutation operation: initializeServer
// ====================================================

export interface initializeServer_initializeServer {
  __typename: "ServerStatus";
  id: string;
  hasBeenInitialized: boolean;
}

export interface initializeServer {
  initializeServer: initializeServer_initializeServer;
}

export interface initializeServerVariables {
  adminPayload: InsertUserPayload;
}
