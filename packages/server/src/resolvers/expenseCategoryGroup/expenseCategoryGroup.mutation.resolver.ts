import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseCategoryGroupModel,
  UpsertExpenseCategoryGroupPayload,
} from '../../models/expenseCategoryGroup'

@Resolver(ExpenseCategoryGroupModel)
export class ExpenseCategoryGroupMutationResolver {
  @Mutation((returns) => ExpenseCategoryGroupModel)
  async upsertExpenseCategoryGroup(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpenseCategoryGroupPayload)
    payload: UpsertExpenseCategoryGroupPayload
  ) {
    return ExpenseCategoryGroupModel.upsertReference(payload, ctx.trx)
  }
}
