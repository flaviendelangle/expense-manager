/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExpenseFilters, OrderOptions, PaginationOptions } from "./../../../globalTypes/api";

// ====================================================
// GraphQL query operation: listExpenses
// ====================================================

export interface listExpenses_expenses_nodes_expenseCategory_expenseCategoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface listExpenses_expenses_nodes_expenseCategory {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  expenseCategoryGroup: listExpenses_expenses_nodes_expenseCategory_expenseCategoryGroup;
}

export interface listExpenses_expenses_nodes_refund_earningCategory {
  __typename: "EarningCategory";
  id: string;
  name: string;
}

export interface listExpenses_expenses_nodes_refund {
  __typename: "Refund";
  id: string;
  earningCategory: listExpenses_expenses_nodes_refund_earningCategory;
  description: string | null;
  value: number;
}

export interface listExpenses_expenses_nodes {
  __typename: "Expense";
  id: string;
  description: string | null;
  value: number;
  spentAt: any;
  expenseCategory: listExpenses_expenses_nodes_expenseCategory;
  refund: listExpenses_expenses_nodes_refund | null;
}

export interface listExpenses_expenses {
  __typename: "PaginatedExpense";
  nodes: listExpenses_expenses_nodes[];
}

export interface listExpenses {
  expenses: listExpenses_expenses;
}

export interface listExpensesVariables {
  filters?: ExpenseFilters | null;
  orderBy?: OrderOptions | null;
  paginate?: PaginationOptions | null;
}
