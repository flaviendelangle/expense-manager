import { filter, ParseFilters } from '../base/ParseFilters'

import { ExpenseCategoryModel } from './expenseCategory.model'
import { ExpenseCategoryFilters } from './expenseCategory.types'

export class ExpenseCategoryParseFilters extends ParseFilters<
  ExpenseCategoryModel,
  ExpenseCategoryFilters
> {
  @filter
  ids() {
    const ids = this.filters?.ids

    if (ids) {
      this.query.whereIn('id', ids)
    }
  }

  @filter
  categoryGroupIds() {
    const categoryGroupIds = this.filters?.categoryGroupIds

    if (categoryGroupIds) {
      this.query.whereIn('category_group_id', categoryGroupIds)
    }
  }
}
