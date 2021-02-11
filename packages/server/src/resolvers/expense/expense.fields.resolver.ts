import { DateTimeResolver } from 'graphql-scalars'
import { pick } from 'lodash'
import {
  Query,
  Resolver,
  Ctx,
  Arg,
  ID,
  Mutation,
  FieldResolver,
  Root,
} from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseModel, UpsertExpensePayload } from '../../models/expense'
import { ExpenseCategoryModel } from '../../models/expenseCategory'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(ExpenseModel)
export class ExpenseFieldsResolver {
  @Query((returns) => [ExpenseModel!])
  async expenses(
    @Ctx()
    ctx: RequestContext
  ) {
    return ExpenseModel.query(ctx.trx).context({ ctx })
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

  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: ExpenseModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: ExpenseModel, @Ctx() ctx: RequestContext) {
    return new Date(model.updatedAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  spentAt(@Root() model: ExpenseModel, @Ctx() ctx: RequestContext) {
    return new Date(model.spentAt)
  }

  @FieldResolver((type) => ExpenseCategoryModel)
  category(@Root() model: ExpenseModel, @Ctx() ctx: RequestContext) {
    return ctx.loaders.expenseCategory.load(model.categoryId)
  }
}
