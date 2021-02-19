import { DateTimeResolver } from 'graphql-scalars'
import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseModel } from '../../models/expense'
import { ExpenseCategoryModel } from '../../models/expenseCategory'
import { RefundModel } from '../../models/refund'

@Resolver(ExpenseModel)
export class ExpenseFieldsResolver {
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
  expenseCategory(@Root() model: ExpenseModel, @Ctx() ctx: RequestContext) {
    return ctx.loaders.expenseCategory.load(model.expenseCategoryId)
  }

  @FieldResolver((type) => RefundModel, { nullable: true })
  refund(@Root() model: ExpenseModel, @Ctx() ctx: RequestContext) {
    if (!model.refundId) {
      return null
    }

    return ctx.loaders.refund.load(model.refundId)
  }
}
