import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseModel,
  ExpenseFilters,
  ExpenseParseFilters,
  PaginatedExpense,
} from '../../models/expense'
import { PaginationOptions, OrderOptions } from '../../utils/PaginatedClass'

@Resolver(ExpenseModel)
export class ExpenseQueryResolver {
  @Query((returns) => PaginatedExpense)
  async expenses(
    @Ctx()
    ctx: RequestContext,
    @Arg('filters', (type) => ExpenseFilters, { nullable: true })
    filters?: ExpenseFilters,
    @Arg('paginate', (type) => PaginationOptions, { nullable: true })
    paginate?: PaginationOptions,
    @Arg('orderBy', (type) => OrderOptions, { nullable: true })
    orderBy?: OrderOptions
  ) {
    const query = ExpenseModel.query(ctx.trx)

    new ExpenseParseFilters(query, filters).parse()
    ExpenseModel.parseOrder(query, orderBy)

    return ExpenseModel.paginate(query, paginate)
  }

  @Query((returns) => ExpenseModel, { nullable: true })
  async expense(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpenseModel.query(ctx.trx).where('id', id).first()
  }
}
