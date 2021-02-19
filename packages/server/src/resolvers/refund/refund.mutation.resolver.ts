import { Resolver, Ctx, Arg, Mutation, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { RefundModel, UpsertRefundPayload } from '../../models/refund'

@Resolver(RefundModel)
export class RefundMutationResolver {
  @Authorized()
  @Mutation((returns) => RefundModel)
  async upsertRefund(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertRefundPayload)
    payload: UpsertRefundPayload
  ) {
    return RefundModel.upsertReference(
      ctx.user?.id as string | number,
      payload,
      ctx.trx
    )
  }
}
