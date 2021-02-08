import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseModel } from '../../models/expense'

@Resolver(ExpenseModel)
export class ExpenseQueryResolver {
  @Query((returns) => [ExpenseModel!])
  async expenses(
    @Ctx()
    ctx: RequestContext
  ) {
    return ExpenseModel.query(ctx.trx).context({ ctx })
  }

  @Query((returns) => ExpenseModel, { nullable: true })
  async expense(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpenseModel.query(ctx.trx).where('id', id).first()
  }
}
