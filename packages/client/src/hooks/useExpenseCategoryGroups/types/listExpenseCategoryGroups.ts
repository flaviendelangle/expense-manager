/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExpenseCategoryGroupFilters } from "./../../../globalTypes/api";

// ====================================================
// GraphQL query operation: listExpenseCategoryGroups
// ====================================================

export interface listExpenseCategoryGroups_expenseCategoryGroups_nodes {
  __typename: "ExpenseCategoryGroup";
  id: string;
  name: string;
  description: string | null;
}

export interface listExpenseCategoryGroups_expenseCategoryGroups {
  __typename: "PaginatedExpenseCategoryGroup";
  nodes: listExpenseCategoryGroups_expenseCategoryGroups_nodes[];
}

export interface listExpenseCategoryGroups {
  expenseCategoryGroups: listExpenseCategoryGroups_expenseCategoryGroups;
}

export interface listExpenseCategoryGroupsVariables {
  filters?: ExpenseCategoryGroupFilters | null;
}
