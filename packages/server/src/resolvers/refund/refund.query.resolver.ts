import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  RefundModel,
  RefundFilters,
  RefundParseFilters,
  PaginatedRefund,
} from '../../models/refund'
import { PaginationOptions, OrderOptions } from '../../utils/PaginatedClass'

@Resolver(RefundModel)
export class RefundQueryResolver {
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

    new RefundParseFilters(query, filters).parse()
    RefundModel.parseOrder(query, orderBy)

    return RefundModel.paginate(query, paginate)
  }

  @Query((returns) => RefundModel, { nullable: true })
  async refund(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return RefundModel.query(ctx.trx).where('id', id).first()
  }
}
