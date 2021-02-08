import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseCategoryGroupModel } from '../../models/expenseCategoryGroup'

@Resolver(ExpenseCategoryGroupModel)
export class ExpenseCategoryGroupQueryResolver {
  @Query((returns) => [ExpenseCategoryGroupModel!])
  async expenseCategoryGroups(
    @Ctx()
    ctx: RequestContext
  ) {
    return ExpenseCategoryGroupModel.query(ctx.trx).context({ ctx })
  }

  @Query((returns) => ExpenseCategoryGroupModel, { nullable: true })
  async expenseCategoryGroup(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpenseCategoryGroupModel.query(ctx.trx).where('id', id).first()
  }
}
