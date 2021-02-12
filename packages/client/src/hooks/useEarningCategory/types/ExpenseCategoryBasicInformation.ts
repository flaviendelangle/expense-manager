/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExpenseCategoryBasicInformation
// ====================================================

export interface ExpenseCategoryBasicInformation_categoryGroup {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
}

export interface ExpenseCategoryBasicInformation {
  __typename: "ExpenseCategory";
  id: string;
  name: string;
  categoryGroup: ExpenseCategoryBasicInformation_categoryGroup;
}
