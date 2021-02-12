/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EarningBasicInformation
// ====================================================

export interface EarningBasicInformation_category {
  __typename: "EarningCategory";
  id: string;
  name: string;
}

export interface EarningBasicInformation {
  __typename: "Earning";
  id: string;
  description: string | null;
  value: number;
  earnedAt: any;
  category: EarningBasicInformation_category;
}
