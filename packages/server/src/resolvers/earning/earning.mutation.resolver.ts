import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { EarningModel, UpsertEarningPayload } from '../../models/earning'

@Resolver(EarningModel)
export class EarningMutationResolver {
  @Mutation((returns) => EarningModel)
  async upsertEarning(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertEarningPayload)
    payload: UpsertEarningPayload
  ) {
    return EarningModel.upsertReference(payload, ctx.trx)
  }
}
