import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpanseCategoryModel } from '../../models/expanseCategory'

@Resolver(ExpanseCategoryModel)
export class ExpanseCategoryQueryResolver {
  @Query((returns) => [ExpanseCategoryModel!])
  async expanseCategories(
    @Ctx()
    ctx: RequestContext
  ) {
    return ExpanseCategoryModel.query(ctx.trx).context({ ctx })
  }

  @Query((returns) => ExpanseCategoryModel, { nullable: true })
  async expanseCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpanseCategoryModel.query(ctx.trx).where('id', id).first()
  }
}
