import { Resolver, Ctx, Arg, Mutation, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { EarningModel, UpsertEarningPayload } from '../../models/earning'

@Resolver(EarningModel)
export class EarningMutationResolver {
  @Authorized()
  @Mutation((returns) => EarningModel)
  async upsertEarning(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertEarningPayload)
    payload: UpsertEarningPayload
  ) {
    return EarningModel.upsertReference(
      ctx.user?.id as string | number,
      payload,
      ctx.trx
    )
  }
}
