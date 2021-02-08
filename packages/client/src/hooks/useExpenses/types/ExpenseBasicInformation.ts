/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExpenseBasicInformation
// ====================================================

export interface ExpenseBasicInformation_category_categoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface ExpenseBasicInformation_category {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  categoryGroup: ExpenseBasicInformation_category_categoryGroup;
}

export interface ExpenseBasicInformation {
  __typename: "Expense";
  id: string;
  description: string | null;
  createdAt: any;
  value: number;
  spentAt: any;
  category: ExpenseBasicInformation_category;
}
