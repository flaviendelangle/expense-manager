import { Resolver, Ctx, Arg, Mutation, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseCategoryModel,
  UpsertExpenseCategoryPayload,
} from '../../models/expenseCategory'

@Resolver(ExpenseCategoryModel)
export class ExpenseCategoryMutationResolver {
  @Authorized()
  @Mutation((returns) => ExpenseCategoryModel)
  async upsertExpenseCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpenseCategoryPayload)
    payload: UpsertExpenseCategoryPayload
  ) {
    return ExpenseCategoryModel.upsertReference(
      ctx.user?.id as string | number,
      payload,
      ctx.trx
    )
  }
}
