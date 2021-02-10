import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  EarningModel,
  EarningFilters,
  EarningParseFilters,
  PaginatedEarning,
} from '../../models/earning'
import { PaginationOptions, OrderOptions } from '../../utils/PaginatedClass'

@Resolver(EarningModel)
export class EarningQueryResolver {
  @Query((returns) => PaginatedEarning)
  async earnings(
    @Ctx()
    ctx: RequestContext,
    @Arg('filters', (type) => EarningFilters, { nullable: true })
    filters?: EarningFilters,
    @Arg('paginate', (type) => PaginationOptions, { nullable: true })
    paginate?: PaginationOptions,
    @Arg('orderBy', (type) => OrderOptions, { nullable: true })
    orderBy?: OrderOptions
  ) {
    const query = EarningModel.query(ctx.trx)

    new EarningParseFilters(query, filters).parse()
    EarningModel.parseOrder(query, orderBy)

    return EarningModel.paginate(query, paginate)
  }

  @Query((returns) => EarningModel, { nullable: true })
  async earning(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return EarningModel.query(ctx.trx).where('id', id).first()
  }
}
