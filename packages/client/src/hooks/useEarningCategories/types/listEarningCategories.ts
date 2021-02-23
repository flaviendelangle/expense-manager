/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EarningCategoryFilters } from "./../../../globalTypes/api";

// ====================================================
// GraphQL query operation: listEarningCategories
// ====================================================

export interface listEarningCategories_earningCategories_nodes {
  __typename: "EarningCategory";
  id: string;
  name: string;
  description: string | null;
}

export interface listEarningCategories_earningCategories {
  __typename: "PaginatedEarningCategory";
  nodes: listEarningCategories_earningCategories_nodes[];
}

export interface listEarningCategories {
  earningCategories: listEarningCategories_earningCategories;
}

export interface listEarningCategoriesVariables {
  filters?: EarningCategoryFilters | null;
}
