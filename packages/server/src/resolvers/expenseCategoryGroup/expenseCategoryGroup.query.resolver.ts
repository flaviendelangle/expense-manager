import { Query, Resolver, Ctx, Arg, ID, Authorized } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseCategoryGroupModel,
  ExpenseCategoryGroupParseFilters,
  PaginatedExpenseCategoryGroup,
  ExpenseCategoryGroupFilters,
} from '../../models/expenseCategoryGroup'
import { ApolloForbidden } from '../../utils/errors'
import { OrderOptions, PaginationOptions } from '../../utils/PaginatedClass'

@Resolver(ExpenseCategoryGroupModel)
export class ExpenseCategoryGroupQueryResolver {
  @Authorized()
  @Query((returns) => PaginatedExpenseCategoryGroup)
  async expenseCategoryGroups(
    @Ctx()
    ctx: RequestContext,
    @Arg('filters', (type) => ExpenseCategoryGroupFilters, { nullable: true })
    filters?: ExpenseCategoryGroupFilters,
    @Arg('paginate', (type) => PaginationOptions, { nullable: true })
    paginate?: PaginationOptions,
    @Arg('orderBy', (type) => OrderOptions, { nullable: true })
    orderBy?: OrderOptions
  ) {
    const query = ExpenseCategoryGroupModel.query(ctx.trx)

    new ExpenseCategoryGroupParseFilters(ctx.user, query, filters).parse()
    ExpenseCategoryGroupModel.parseOrder(query, orderBy)

    return ExpenseCategoryGroupModel.paginate(query, paginate)
  }

  @Authorized()
  @Query((returns) => ExpenseCategoryGroupModel, { nullable: true })
  async expenseCategoryGroup(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    const expenseCategoryGroup = await ExpenseCategoryGroupModel.query(ctx.trx)
      .where('id', id)
      .first()

    if (expenseCategoryGroup && expenseCategoryGroup.userId !== ctx.user?.id) {
      throw new ApolloForbidden({
        message: 'Wrong user',
      })
    }

    return expenseCategoryGroup
  }
}
