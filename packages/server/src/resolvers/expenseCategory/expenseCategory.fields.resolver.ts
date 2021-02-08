import { DateTimeResolver } from 'graphql-scalars'
import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseModel } from '../../models/expense'
import { ExpenseCategoryModel } from '../../models/expenseCategory'

@Resolver(ExpenseCategoryModel)
export class ExpenseResolver {
  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: ExpenseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: ExpenseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => [ExpenseModel!]!)
  expenses(@Root() model: ExpenseCategoryModel, @Ctx() ctx: RequestContext) {
    return ExpenseModel.query(ctx.trx).where('category_id', model.id)
  }
}
