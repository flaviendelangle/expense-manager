import { filter, ParseFilters } from '../base/ParseFilters'

import { EarningModel } from './earning.model'
import { EarningFilters } from './earning.types'

export class EarningParseFilters extends ParseFilters<
  EarningModel,
  EarningFilters
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
      this.query.whereIn('categoryId', categoryIds)
    }
  }
}
