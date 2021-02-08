import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseCategoryModel } from '../../models/expenseCategory'

@Resolver(ExpenseCategoryModel)
export class ExpenseCategoryQueryResolver {
  @Query((returns) => [ExpenseCategoryModel!])
  async expenseCategories(
    @Ctx()
    ctx: RequestContext
  ) {
    return ExpenseCategoryModel.query(ctx.trx).context({ ctx })
  }

  @Query((returns) => ExpenseCategoryModel, { nullable: true })
  async expenseCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpenseCategoryModel.query(ctx.trx).where('id', id).first()
  }
}
