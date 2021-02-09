import { filter, ParseFilters } from '../base/ParseFilters'

import { ExpenseCategoryGroupModel } from './expenseCategoryGroup.model'
import { ExpenseCategoryGroupFilters } from './expenseCategoryGroup.types'

export class ExpenseCategoryGroupParseFilters extends ParseFilters<
  ExpenseCategoryGroupModel,
  ExpenseCategoryGroupFilters
> {
  @filter
  ids() {
    const ids = this.filters?.ids

    if (ids) {
      this.query.whereIn('id', ids)
    }
  }
}
