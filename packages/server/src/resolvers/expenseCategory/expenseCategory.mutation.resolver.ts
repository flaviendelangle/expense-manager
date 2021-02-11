import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseCategoryModel,
  UpsertExpenseCategoryPayload,
} from '../../models/expenseCategory'

@Resolver(ExpenseCategoryModel)
export class ExpenseCategoryMutationResolver {
  @Mutation((returns) => ExpenseCategoryModel)
  async upsertExpenseCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpenseCategoryPayload)
    payload: UpsertExpenseCategoryPayload
  ) {
    return ExpenseCategoryModel.upsertReference(payload, ctx.trx)
  }
}
