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
  categoryIds?: string[] | null;
  earnedAt?: DateFilter | null;
  ids?: string[] | null;
}

export interface ExpenseCategoryFilters {
  categoryGroupIds?: string[] | null;
  ids?: string[] | null;
}

export interface ExpenseFilters {
  categoryIds?: string[] | null;
  ids?: string[] | null;
  spentAt?: DateFilter | null;
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
  categoryId?: string | null;
  description?: string | null;
  earnedAt?: any | null;
  id?: string | null;
  value?: number | null;
}

export interface UpsertExpensePayload {
  categoryId?: string | null;
  description?: string | null;
  id?: string | null;
  spentAt?: any | null;
  value?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
