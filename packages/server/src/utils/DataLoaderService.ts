import DataLoader from 'dataloader'

import { RequestContext } from '../globalTypes'
import { EarningCategoryModel } from '../models/earningCategory'
import { ExpenseCategoryModel } from '../models/expenseCategory'
import { ExpenseCategoryGroupModel } from '../models/expenseCategoryGroup'
import { RefundModel } from '../models/refund'

export class DataLoaderService {
  public ctx: RequestContext

  constructor(ctx: RequestContext = {}) {
    this.ctx = ctx
  }

  expenseCategory = new DataLoader((ids: (string | number)[]) =>
    ExpenseCategoryModel.findByIds(
      this.ctx,
      ids.map((id) => Number(id))
    )
  )

  expenseCategoryGroup = new DataLoader((ids: (string | number)[]) =>
    ExpenseCategoryGroupModel.findByIds(
      this.ctx,
      ids.map((id) => Number(id))
    )
  )

  earningCategory = new DataLoader((ids: (string | number)[]) =>
    EarningCategoryModel.findByIds(
      this.ctx,
      ids.map((id) => Number(id))
    )
  )

  refund = new DataLoader((ids: (string | number)[]) =>
    RefundModel.findByIds(
      this.ctx,
      ids.map((id) => Number(id))
    )
  )
}
