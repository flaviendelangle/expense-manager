/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertExpenseCategoryGroupPayload } from "./../../../../globalTypes/api";

// ====================================================
// GraphQL mutation operation: upsertExpenseCategoryGroupForm
// ====================================================

export interface upsertExpenseCategoryGroupForm_upsertExpenseCategoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
  description: string | null;
}

export interface upsertExpenseCategoryGroupForm {
  upsertExpenseCategoryGroup: upsertExpenseCategoryGroupForm_upsertExpenseCategoryGroup;
}

export interface upsertExpenseCategoryGroupFormVariables {
  payload: UpsertExpenseCategoryGroupPayload;
}
