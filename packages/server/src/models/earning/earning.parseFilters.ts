import { ApolloForbidden } from '../../utils/errors'
import { filter, ParseFilters } from '../base/ParseFilters'

import { EarningModel } from './earning.model'
import { EarningFilters } from './earning.types'

export class EarningParseFilters extends ParseFilters<
  EarningModel,
  EarningFilters
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
  earningCategoryIds() {
    const earningCategoryIds = this.filters?.earningCategoryIds

    if (earningCategoryIds) {
      this.query.whereIn('earningCategoryId', earningCategoryIds)
    }
  }

  @filter
  earnedAt() {
    const earnedAt = this.filters?.earnedAt

    if (earnedAt?.after) {
      this.query.where('earnedAt', '>=', earnedAt.after)
    }

    if (earnedAt?.before) {
      this.query.where('earnedAt', '<=', earnedAt.before)
    }
  }
}
