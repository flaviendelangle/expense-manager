import { DateTimeResolver } from 'graphql-scalars'
import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpanseModel } from '../../models/expanse'
import { ExpanseCategoryModel } from '../../models/expanseCategory'

@Resolver(ExpanseCategoryModel)
export class ExpanseResolver {
  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: ExpanseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: ExpanseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => [ExpanseModel!]!)
  expanses(@Root() model: ExpanseCategoryModel, @Ctx() ctx: RequestContext) {
    return ExpanseModel.query(ctx.trx).where('category_id', model.id)
  }
}
