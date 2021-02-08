import DataLoader from 'dataloader'

import { RequestContext } from '../globalTypes'
import { ExpanseCategoryModel } from '../models/expanseCategory'

export class DataLoaderService {
  public ctx: RequestContext

  constructor(ctx: RequestContext = {}) {
    this.ctx = ctx
  }

  expanseCategory = new DataLoader((ids: (string | number)[]) =>
    ExpanseCategoryModel.findByIds(
      this.ctx,
      ids.map((id) => Number(id))
    )
  )
}
