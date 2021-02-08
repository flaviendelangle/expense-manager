import DataLoader from 'dataloader'

import { RequestContext } from '../globalTypes'
import { ExpenseCategoryModel } from '../models/expenseCategory'
import { ExpenseCategoryGroupModel } from '../models/expenseCategoryGroup'

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
}
