/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExpenseCategoryBasicInformation
// ====================================================

export interface ExpenseCategoryBasicInformation_expenseCategoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface ExpenseCategoryBasicInformation {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  expenseCategoryGroup: ExpenseCategoryBasicInformation_expenseCategoryGroup;
}
