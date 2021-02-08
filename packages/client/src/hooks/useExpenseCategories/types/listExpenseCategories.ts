/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: listExpenseCategories
// ====================================================

export interface listExpenseCategories_expenseCategories_categoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface listExpenseCategories_expenseCategories {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  categoryGroup: listExpenseCategories_expenseCategories_categoryGroup;
}

export interface listExpenseCategories {
  expenseCategories: listExpenseCategories_expenseCategories[];
}
