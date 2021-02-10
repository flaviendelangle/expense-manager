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
import { EarningModel, UpsertEarningPayload } from '../../models/earning'
import { EarningCategoryModel } from '../../models/earningCategory'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

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
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  spentAt(@Root() model: EarningModel, @Ctx() ctx: RequestContext) {
    return new Date(model.spentAt)
  }

  @FieldResolver((type) => EarningCategoryModel)
  category(@Root() model: EarningModel, @Ctx() ctx: RequestContext) {
    return ctx.loaders.earningCategory.load(model.categoryId)
  }
}
