import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseCategoryModel,
  PaginatedExpenseCategory,
  ExpenseCategoryParseFilters,
  ExpenseCategoryFilters,
} from '../../models/expenseCategory'
import { OrderOptions, PaginationOptions } from '../../utils/PaginatedClass'

@Resolver(ExpenseCategoryModel)
export class ExpenseCategoryQueryResolver {
  @Query((returns) => PaginatedExpenseCategory)
  async expenseCategories(
    @Ctx()
    ctx: RequestContext,
    @Arg('filters', (type) => ExpenseCategoryFilters, { nullable: true })
    filters?: ExpenseCategoryFilters,
    @Arg('paginate', (type) => PaginationOptions, { nullable: true })
    paginate?: PaginationOptions,
    @Arg('orderBy', (type) => OrderOptions, { nullable: true })
    orderBy?: OrderOptions
  ) {
    const query = ExpenseCategoryModel.query(ctx.trx)

    new ExpenseCategoryParseFilters(query, filters).parse()
    ExpenseCategoryModel.parseOrder(query, orderBy)

    return ExpenseCategoryModel.paginate(query, paginate)
  }

  @Query((returns) => ExpenseCategoryModel, { nullable: true })
  async expenseCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpenseCategoryModel.query(ctx.trx).where('id', id).first()
  }
}
