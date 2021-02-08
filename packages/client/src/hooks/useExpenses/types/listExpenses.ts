/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: listExpenses
// ====================================================

export interface listExpenses_expenses_category {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
}

export interface listExpenses_expenses {
  __typename: "Expense";
  id: string;
  description: string | null;
  createdAt: any;
  value: number;
  category: listExpenses_expenses_category;
}

export interface listExpenses {
  expenses: listExpenses_expenses[];
}
