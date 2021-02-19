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
import { EarningCategoryModel } from '../../models/earningCategory'
import { ExpenseModel } from '../../models/expense'
import { RefundModel } from '../../models/refund'

@Resolver(RefundModel)
export class RefundFieldsResolver {
  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: RefundModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: RefundModel, @Ctx() ctx: RequestContext) {
    return new Date(model.updatedAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  refundedAt(@Root() model: RefundModel, @Ctx() ctx: RequestContext) {
    return new Date(model.refundedAt)
  }

  @FieldResolver((type) => EarningCategoryModel)
  earningCategory(@Root() model: RefundModel, @Ctx() ctx: RequestContext) {
    return ctx.loaders.earningCategory.load(model.earningCategoryId)
  }

  @FieldResolver((type) => ExpenseModel, { nullable: true })
  expense(@Root() model: RefundModel, @Ctx() ctx: RequestContext) {
    return ExpenseModel.query().where('refundId', model.id).first()
  }
}
