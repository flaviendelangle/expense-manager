import { DateTimeResolver } from 'graphql-scalars'
import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseCategoryModel } from '../../models/expenseCategory'
import { ExpenseCategoryGroupModel } from '../../models/expenseCategoryGroup'

@Resolver(ExpenseCategoryGroupModel)
export class ExpenseCategoryGroupResolver {
  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: ExpenseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: ExpenseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.updatedAt)
  }

  @FieldResolver((type) => [ExpenseCategoryGroupModel!])
  categories(@Root() model: ExpenseCategoryModel, @Ctx() ctx: RequestContext) {
    return ExpenseCategoryModel.query(ctx.trx).where(
      'categoryGroupId',
      model.id
    )
  }
}
