import { ApolloForbidden } from '../../utils/errors'
import { filter, ParseFilters } from '../base/ParseFilters'

import { ExpenseModel } from './expense.model'
import { ExpenseFilters } from './expense.types'

export class ExpenseParseFilters extends ParseFilters<
  ExpenseModel,
  ExpenseFilters
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
  expenseCategoryIds() {
    const expenseCategoryIds = this.filters?.expenseCategoryIds

    if (expenseCategoryIds) {
      this.query.whereIn('expenseCategoryId', expenseCategoryIds)
    }
  }

  @filter
  spentAt() {
    const spentAt = this.filters?.spentAt

    if (spentAt?.after) {
      this.query.where('spentAt', '>=', spentAt.after)
    }

    if (spentAt?.before) {
      this.query.where('spentAt', '<=', spentAt.before)
    }
  }
}
