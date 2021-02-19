import { Query, Resolver, Ctx, Arg, ID, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseCategoryModel,
  PaginatedExpenseCategory,
  ExpenseCategoryParseFilters,
  ExpenseCategoryFilters,
} from '../../models/expenseCategory'
import { ApolloForbidden } from '../../utils/errors'
import { OrderOptions, PaginationOptions } from '../../utils/PaginatedClass'

@Resolver(ExpenseCategoryModel)
export class ExpenseCategoryQueryResolver {
  @Authorized()
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

    new ExpenseCategoryParseFilters(ctx.user, query, filters).parse()
    ExpenseCategoryModel.parseOrder(query, orderBy)

    return ExpenseCategoryModel.paginate(query, paginate)
  }

  @Authorized()
  @Query((returns) => ExpenseCategoryModel, { nullable: true })
  async expenseCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    const expenseCategory = await ExpenseCategoryModel.query(ctx.trx)
      .where('id', id)
      .first()

    if (expenseCategory && expenseCategory.userId !== ctx.user?.id) {
      throw new ApolloForbidden({
        message: 'Wrong user',
      })
    }

    return expenseCategory
  }
}
