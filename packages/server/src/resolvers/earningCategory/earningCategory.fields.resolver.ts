import { DateTimeResolver } from 'graphql-scalars'
import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { EarningModel } from '../../models/earning'
import { EarningCategoryModel } from '../../models/earningCategory'

@Resolver(EarningCategoryModel)
export class EarningCategoryFieldsResolver {
  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: EarningCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: EarningCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => [EarningModel!]!)
  earnings(@Root() model: EarningCategoryModel, @Ctx() ctx: RequestContext) {
    return EarningModel.query(ctx.trx).where('categoryId', model.id)
  }
}
