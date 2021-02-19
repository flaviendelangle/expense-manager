import { ApolloForbidden } from '../../utils/errors'
import { filter, ParseFilters } from '../base/ParseFilters'

import { ExpenseCategoryModel } from './expenseCategory.model'
import { ExpenseCategoryFilters } from './expenseCategory.types'

export class ExpenseCategoryParseFilters extends ParseFilters<
  ExpenseCategoryModel,
  ExpenseCategoryFilters
> {
  @filter
  userId() {
    if (!this.user?.id) {
      throw new ApolloForbidden({
        message: 'No user',
      })
    }

    this.query.where('userId', this.user.id)
  }

  @filter
  ids() {
    const ids = this.filters?.ids

    if (ids) {
      this.query.whereIn('id', ids)
    }
  }

  @filter
  expenseCategoryGroupIds() {
    const expenseCategoryGroupIds = this.filters?.expenseCategoryGroupIds

    if (expenseCategoryGroupIds) {
      this.query.whereIn('expenseCategoryGroupId', expenseCategoryGroupIds)
    }
  }
}
