import { Query, Resolver, Ctx, Arg, ID, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  RefundModel,
  RefundFilters,
  RefundParseFilters,
  PaginatedRefund,
} from '../../models/refund'
import { ApolloForbidden } from '../../utils/errors'
import { PaginationOptions, OrderOptions } from '../../utils/PaginatedClass'

@Resolver(RefundModel)
export class RefundQueryResolver {
  @Authorized()
  @Query((returns) => PaginatedRefund)
  async refunds(
    @Ctx()
    ctx: RequestContext,
    @Arg('filters', (type) => RefundFilters, { nullable: true })
    filters?: RefundFilters,
    @Arg('paginate', (type) => PaginationOptions, { nullable: true })
    paginate?: PaginationOptions,
    @Arg('orderBy', (type) => OrderOptions, { nullable: true })
    orderBy?: OrderOptions
  ) {
    const query = RefundModel.query(ctx.trx)

    new RefundParseFilters(ctx.user, query, filters).parse()
    RefundModel.parseOrder(query, orderBy)

    return RefundModel.paginate(query, paginate)
  }

  @Authorized()
  @Query((returns) => RefundModel, { nullable: true })
  async refund(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    const refund = await RefundModel.query(ctx.trx).where('id', id).first()

    if (refund && refund.userId !== ctx.user?.id) {
      throw new ApolloForbidden({
        message: 'Wrong user',
      })
    }

    return refund
  }
}
