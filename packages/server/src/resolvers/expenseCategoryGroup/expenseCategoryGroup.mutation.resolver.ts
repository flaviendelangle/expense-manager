import { Resolver, Ctx, Arg, Mutation, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseCategoryGroupModel,
  UpsertExpenseCategoryGroupPayload,
} from '../../models/expenseCategoryGroup'

@Resolver(ExpenseCategoryGroupModel)
export class ExpenseCategoryGroupMutationResolver {
  @Authorized()
  @Mutation((returns) => ExpenseCategoryGroupModel)
  async upsertExpenseCategoryGroup(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpenseCategoryGroupPayload)
    payload: UpsertExpenseCategoryGroupPayload
  ) {
    return ExpenseCategoryGroupModel.upsertReference(
      ctx.user?.id as string | number,
      payload,
      ctx.trx
    )
  }
}
