import { DateTimeResolver } from 'graphql-scalars'
import {
  Query,
  Resolver,
  Ctx,
  Arg,
  ID,
  FieldResolver,
  Root,
} from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { EarningModel } from '../../models/earning'
import { EarningCategoryModel } from '../../models/earningCategory'

@Resolver(EarningModel)
export class EarningFieldsResolver {
  @Query((returns) => [EarningModel!])
  async earnings(
    @Ctx()
    ctx: RequestContext
  ) {
    return EarningModel.query(ctx.trx).context({ ctx })
  }

  @Query((returns) => EarningModel, { nullable: true })
  async earning(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return EarningModel.query(ctx.trx).where('id', id).first()
  }

  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: EarningModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: EarningModel, @Ctx() ctx: RequestContext) {
    return new Date(model.updatedAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  earnedAt(@Root() model: EarningModel, @Ctx() ctx: RequestContext) {
    return new Date(model.earnedAt)
  }

  @FieldResolver((type) => EarningCategoryModel)
  earningCategory(@Root() model: EarningModel, @Ctx() ctx: RequestContext) {
    return ctx.loaders.earningCategory.load(model.earningCategoryId)
  }
}
