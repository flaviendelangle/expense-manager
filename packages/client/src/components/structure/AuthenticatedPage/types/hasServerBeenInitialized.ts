/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: hasServerBeenInitialized
// ====================================================

export interface hasServerBeenInitialized_serverStatus {
  __typename: "ServerStatus";
  id: string;
  hasBeenInitialized: boolean;
}

export interface hasServerBeenInitialized {
  serverStatus: hasServerBeenInitialized_serverStatus;
}
