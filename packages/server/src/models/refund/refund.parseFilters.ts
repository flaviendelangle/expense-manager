import { filter, ParseFilters } from '../base/ParseFilters'

import { RefundModel } from './refund.model'
import { RefundFilters } from './refund.types'

export class RefundParseFilters extends ParseFilters<
  RefundModel,
  RefundFilters
> {
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
  refundedAt() {
    const refundedAt = this.filters?.refundedAt

    if (refundedAt?.after) {
      this.query.where('refundedAt', '>=', refundedAt.after)
    }

    if (refundedAt?.before) {
      this.query.where('refundedAt', '<=', refundedAt.before)
    }
  }
}
