import { filter, ParseFilters } from '../base/ParseFilters'

import { EarningCategoryModel } from './earningCategory.model'
import { EarningCategoryFilters } from './earningCategory.types'

export class EarningCategoryParseFilters extends ParseFilters<
  EarningCategoryModel,
  EarningCategoryFilters
> {
  @filter
  ids() {
    const ids = this.filters?.ids

    if (ids) {
      this.query.whereIn('id', ids)
    }
  }
}
