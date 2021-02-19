import { Resolver, Ctx, Arg, Mutation, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseModel, UpsertExpensePayload } from '../../models/expense'

@Resolver(ExpenseModel)
export class ExpenseMutationResolver {
  @Authorized()
  @Mutation((returns) => ExpenseModel)
  async upsertExpense(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpensePayload)
    payload: UpsertExpensePayload
  ) {
    return ExpenseModel.upsertReference(
      ctx.user?.id as string | number,
      payload,
      ctx.trx
    )
  }
}
