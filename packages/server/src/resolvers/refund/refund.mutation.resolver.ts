import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { RefundModel, UpsertRefundPayload } from '../../models/refund'

@Resolver(RefundModel)
export class RefundMutationResolver {
  @Mutation((returns) => RefundModel)
  async upsertRefund(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertRefundPayload)
    payload: UpsertRefundPayload
  ) {
    return RefundModel.upsertReference(payload, ctx.trx)
  }
}
