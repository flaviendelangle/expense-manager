import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  EarningCategoryModel,
  UpsertEarningCategoryPayload,
} from '../../models/earningCategory'

@Resolver(EarningCategoryModel)
export class EarningCategoryMutationResolver {
  @Mutation((returns) => EarningCategoryModel)
  async upsertEarningCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertEarningCategoryPayload)
    payload: UpsertEarningCategoryPayload
  ) {
    return EarningCategoryModel.upsertReference(payload, ctx.trx)
  }
}
