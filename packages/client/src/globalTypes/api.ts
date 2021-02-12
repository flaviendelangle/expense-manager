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

export interface ExpenseFilters {
  categoryIds?: string[] | null;
  ids?: string[] | null;
  spentAt?: DateFilter | null;
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
