/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertExpenseCategoryPayload } from "./../../../../globalTypes/api";

// ====================================================
// GraphQL mutation operation: upsertExpenseCategoryForm
// ====================================================

export interface upsertExpenseCategoryForm_upsertExpenseCategory_expenseCategoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface upsertExpenseCategoryForm_upsertExpenseCategory {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  description: string | null;
  expenseCategoryGroup: upsertExpenseCategoryForm_upsertExpenseCategory_expenseCategoryGroup;
}

export interface upsertExpenseCategoryForm {
  upsertExpenseCategory: upsertExpenseCategoryForm_upsertExpenseCategory;
}

export interface upsertExpenseCategoryFormVariables {
  payload: UpsertExpenseCategoryPayload;
}
