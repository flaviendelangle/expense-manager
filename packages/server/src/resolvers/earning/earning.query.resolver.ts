import { Query, Resolver, Ctx, Arg, ID, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  EarningModel,
  EarningFilters,
  EarningParseFilters,
  PaginatedEarning,
} from '../../models/earning'
import { ApolloForbidden } from '../../utils/errors'
import { PaginationOptions, OrderOptions } from '../../utils/PaginatedClass'

@Resolver(EarningModel)
export class EarningQueryResolver {
  @Authorized()
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

    new EarningParseFilters(ctx.user, query, filters).parse()
    EarningModel.parseOrder(query, orderBy)

    return EarningModel.paginate(query, paginate)
  }

  @Authorized()
  @Query((returns) => EarningModel, { nullable: true })
  async earning(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    const earning = await EarningModel.query(ctx.trx).where('id', id).first()

    if (earning && earning.userId !== ctx.user?.id) {
      throw new ApolloForbidden({
        message: 'Wrong user',
      })
    }

    return earning
  }
}
