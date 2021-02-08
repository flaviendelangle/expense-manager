/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: listExpenses
// ====================================================

export interface listExpenses_expenses_category_categoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface listExpenses_expenses_category {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  categoryGroup: listExpenses_expenses_category_categoryGroup;
}

export interface listExpenses_expenses {
  __typename: "Expense";
  id: string;
  description: string | null;
  createdAt: any;
  value: number;
  spentAt: any;
  category: listExpenses_expenses_category;
}

export interface listExpenses {
  expenses: listExpenses_expenses[];
}
