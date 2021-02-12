/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EarningFilters } from "./../../../globalTypes/api";

// ====================================================
// GraphQL query operation: listEarnings
// ====================================================

export interface listEarnings_earnings_nodes_category {
  __typename: "EarningCategory";
  id: string;
  name: string;
}

export interface listEarnings_earnings_nodes {
  __typename: "Earning";
  id: string;
  description: string | null;
  value: number;
  earnedAt: any;
  category: listEarnings_earnings_nodes_category;
}

export interface listEarnings_earnings {
  __typename: "PaginatedEarning";
  nodes: listEarnings_earnings_nodes[];
}

export interface listEarnings {
  earnings: listEarnings_earnings;
}

export interface listEarningsVariables {
  filters?: EarningFilters | null;
}
