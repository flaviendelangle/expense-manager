/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExpenseBasicInformation
// ====================================================

export interface ExpenseBasicInformation_expenseCategory_expenseCategoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface ExpenseBasicInformation_expenseCategory {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  expenseCategoryGroup: ExpenseBasicInformation_expenseCategory_expenseCategoryGroup;
}

export interface ExpenseBasicInformation_refund_earningCategory {
  __typename: "EarningCategory";
  id: string;
  name: string;
}

export interface ExpenseBasicInformation_refund {
  __typename: "Refund";
  id: string;
  earningCategory: ExpenseBasicInformation_refund_earningCategory;
  description: string | null;
  value: number;
}

export interface ExpenseBasicInformation {
  __typename: "Expense";
  id: string;
  description: string | null;
  value: number;
  spentAt: any;
  expenseCategory: ExpenseBasicInformation_expenseCategory;
  refund: ExpenseBasicInformation_refund | null;
}
