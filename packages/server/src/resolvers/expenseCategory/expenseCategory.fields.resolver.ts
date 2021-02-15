import { DateTimeResolver } from 'graphql-scalars'
import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseModel } from '../../models/expense'
import { ExpenseCategoryModel } from '../../models/expenseCategory'
import { ExpenseCategoryGroupModel } from '../../models/expenseCategoryGroup'

@Resolver(ExpenseCategoryModel)
export class ExpenseCategoryFieldsResolver {
  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: ExpenseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: ExpenseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.updatedAt)
  }

  @FieldResolver((type) => [ExpenseModel!]!)
  expenses(@Root() model: ExpenseCategoryModel, @Ctx() ctx: RequestContext) {
    return ExpenseModel.query(ctx.trx).where('expenseCategoryId', model.id)
  }

  @FieldResolver((type) => ExpenseCategoryGroupModel)
  expenseCategoryGroup(
    @Root() model: ExpenseCategoryModel,
    @Ctx() ctx: RequestContext
  ) {
    return ctx.loaders.expenseCategoryGroup.load(model.expenseCategoryGroupId)
  }
}
