/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertEarningPayload } from "./../../../../globalTypes/api";

// ====================================================
// GraphQL mutation operation: upsertEarningForm
// ====================================================

export interface upsertEarningForm_upsertEarning_earningCategory {
  __typename: "EarningCategory";
  id: string;
  name: string;
}

export interface upsertEarningForm_upsertEarning {
  __typename: "Earning";
  id: string;
  description: string | null;
  value: number;
  earnedAt: any;
  earningCategory: upsertEarningForm_upsertEarning_earningCategory;
}

export interface upsertEarningForm {
  upsertEarning: upsertEarningForm_upsertEarning;
}

export interface upsertEarningFormVariables {
  payload: UpsertEarningPayload;
}
