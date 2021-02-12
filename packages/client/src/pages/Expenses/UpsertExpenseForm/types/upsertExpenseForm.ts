/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertExpensePayload } from "./../../../../globalTypes/api";

// ====================================================
// GraphQL mutation operation: upsertExpenseForm
// ====================================================

export interface upsertExpenseForm_upsertExpense_category_categoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface upsertExpenseForm_upsertExpense_category {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  categoryGroup: upsertExpenseForm_upsertExpense_category_categoryGroup;
}

export interface upsertExpenseForm_upsertExpense {
  __typename: "Expense";
  id: string;
  description: string | null;
  value: number;
  spentAt: any;
  category: upsertExpenseForm_upsertExpense_category;
}

export interface upsertExpenseForm {
  upsertExpense: upsertExpenseForm_upsertExpense;
}

export interface upsertExpenseFormVariables {
  payload: UpsertExpensePayload;
}
