import { ApolloForbidden } from '../../utils/errors'
import { filter, ParseFilters } from '../base/ParseFilters'

import { EarningCategoryModel } from './earningCategory.model'
import { EarningCategoryFilters } from './earningCategory.types'

export class EarningCategoryParseFilters extends ParseFilters<
  EarningCategoryModel,
  EarningCategoryFilters
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
