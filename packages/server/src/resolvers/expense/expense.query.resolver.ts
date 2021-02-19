import { Query, Resolver, Ctx, Arg, ID, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseModel,
  ExpenseFilters,
  ExpenseParseFilters,
  PaginatedExpense,
} from '../../models/expense'
import { ApolloForbidden } from '../../utils/errors'
import { PaginationOptions, OrderOptions } from '../../utils/PaginatedClass'

@Resolver(ExpenseModel)
export class ExpenseQueryResolver {
  @Authorized()
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

    new ExpenseParseFilters(ctx.user, query, filters).parse()
    ExpenseModel.parseOrder(query, orderBy)

    return ExpenseModel.paginate(query, paginate)
  }

  @Authorized()
  @Query((returns) => ExpenseModel, { nullable: true })
  async expense(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    const expense = await ExpenseModel.query(ctx.trx).where('id', id).first()

    if (expense && expense.userId !== ctx.user?.id) {
      throw new ApolloForbidden({
        message: 'Wrong user',
      })
    }

    return expense
  }
}
