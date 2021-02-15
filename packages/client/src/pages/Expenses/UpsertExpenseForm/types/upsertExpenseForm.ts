/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertExpensePayload } from "./../../../../globalTypes/api";

// ====================================================
// GraphQL mutation operation: upsertExpenseForm
// ====================================================

export interface upsertExpenseForm_upsertExpense_expenseCategory_expenseCategoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface upsertExpenseForm_upsertExpense_expenseCategory {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  expenseCategoryGroup: upsertExpenseForm_upsertExpense_expenseCategory_expenseCategoryGroup;
}

export interface upsertExpenseForm_upsertExpense {
  __typename: "Expense";
  id: string;
  description: string | null;
  value: number;
  spentAt: any;
  expenseCategory: upsertExpenseForm_upsertExpense_expenseCategory;
}

export interface upsertExpenseForm {
  upsertExpense: upsertExpenseForm_upsertExpense;
}

export interface upsertExpenseFormVariables {
  payload: UpsertExpensePayload;
}
