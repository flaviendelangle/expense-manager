import { filter, ParseFilters } from '../base/ParseFilters'

import { ExpenseModel } from './expense.model'
import { ExpenseFilters } from './expense.types'

export class ExpenseParseFilters extends ParseFilters<
  ExpenseModel,
  ExpenseFilters
> {
  @filter
  ids() {
    const ids = this.filters?.ids

    if (ids) {
      this.query.whereIn('id', ids)
    }
  }

  @filter
  categoryIds() {
    const categoryIds = this.filters?.categoryIds

    if (categoryIds) {
      this.query.whereIn('category_id', categoryIds)
    }
  }
}
