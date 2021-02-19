/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface DateFilter {
  after?: any | null;
  before?: any | null;
}

export interface EarningCategoryFilters {
  ids?: string[] | null;
}

export interface EarningFilters {
  earnedAt?: DateFilter | null;
  earningCategoryIds?: string[] | null;
  ids?: string[] | null;
}

export interface ExpenseCategoryFilters {
  expenseCategoryGroupIds?: string[] | null;
  ids?: string[] | null;
}

export interface ExpenseFilters {
  expenseCategoryIds?: string[] | null;
  ids?: string[] | null;
  spentAt?: DateFilter | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OrderOptions {
  direction?: string | null;
  field?: string | null;
}

export interface PaginationOptions {
  limit: number;
  offset: number;
}

export interface UpsertEarningPayload {
  description?: string | null;
  earnedAt?: any | null;
  earningCategoryId?: string | null;
  id?: string | null;
  value?: number | null;
}

export interface UpsertExpensePayload {
  description?: string | null;
  expenseCategoryId?: string | null;
  id?: string | null;
  refund?: UpsertRefundPayload | null;
  spentAt?: any | null;
  value?: number | null;
}

export interface UpsertRefundPayload {
  description?: string | null;
  earningCategoryId?: string | null;
  id?: string | null;
  refundedAt?: any | null;
  value?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
