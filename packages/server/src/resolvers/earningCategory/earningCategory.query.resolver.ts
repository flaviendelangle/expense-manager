import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  EarningCategoryModel,
  EarningCategoryFilters,
  EarningCategoryParseFilters,
  PaginatedEarningCategory,
} from '../../models/earningCategory'
import { OrderOptions, PaginationOptions } from '../../utils/PaginatedClass'

@Resolver(EarningCategoryModel)
export class EarningCategoryQueryResolver {
  @Query((returns) => PaginatedEarningCategory)
  async earningCategories(
    @Ctx()
    ctx: RequestContext,
    @Arg('filters', (type) => EarningCategoryFilters, { nullable: true })
    filters?: EarningCategoryFilters,
    @Arg('paginate', (type) => PaginationOptions, { nullable: true })
    paginate?: PaginationOptions,
    @Arg('orderBy', (type) => OrderOptions, { nullable: true })
    orderBy?: OrderOptions
  ) {
    const query = EarningCategoryModel.query(ctx.trx)

    new EarningCategoryParseFilters(query, filters).parse()
    EarningCategoryModel.parseOrder(query, orderBy)

    return EarningCategoryModel.paginate(query, paginate)
  }

  @Query((returns) => EarningCategoryModel, { nullable: true })
  async earningCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return EarningCategoryModel.query(ctx.trx).where('id', id).first()
  }
}
