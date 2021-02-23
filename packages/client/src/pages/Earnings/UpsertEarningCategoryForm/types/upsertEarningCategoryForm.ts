/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertEarningCategoryPayload } from "./../../../../globalTypes/api";

// ====================================================
// GraphQL mutation operation: upsertEarningCategoryForm
// ====================================================

export interface upsertEarningCategoryForm_upsertEarningCategory {
  __typename: "EarningCategory";
  id: string;
  name: string;
  description: string | null;
}

export interface upsertEarningCategoryForm {
  upsertEarningCategory: upsertEarningCategoryForm_upsertEarningCategory;
}

export interface upsertEarningCategoryFormVariables {
  payload: UpsertEarningCategoryPayload;
}
