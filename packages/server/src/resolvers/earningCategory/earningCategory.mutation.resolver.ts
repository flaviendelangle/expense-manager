import { Resolver, Ctx, Arg, Mutation, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  EarningCategoryModel,
  UpsertEarningCategoryPayload,
} from '../../models/earningCategory'

@Resolver(EarningCategoryModel)
export class EarningCategoryMutationResolver {
  @Authorized()
  @Mutation((returns) => EarningCategoryModel)
  async upsertEarningCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertEarningCategoryPayload)
    payload: UpsertEarningCategoryPayload
  ) {
    return EarningCategoryModel.upsertReference(
      ctx.user?.id as string | number,
      payload,
      ctx.trx
    )
  }
}
