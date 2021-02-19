import { ApolloForbidden } from '../../utils/errors'
import { filter, ParseFilters } from '../base/ParseFilters'

import { ExpenseCategoryGroupModel } from './expenseCategoryGroup.model'
import { ExpenseCategoryGroupFilters } from './expenseCategoryGroup.types'

export class ExpenseCategoryGroupParseFilters extends ParseFilters<
  ExpenseCategoryGroupModel,
  ExpenseCategoryGroupFilters
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
}
