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
import { ExpanseModel, UpsertExpansePayload } from '../../models/expanse'
import { ExpanseCategoryModel } from '../../models/expanseCategory'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(ExpanseModel)
export class ExpanseFieldsResolver {
  @Query((returns) => [ExpanseModel!])
  async expanses(
    @Ctx()
    ctx: RequestContext
  ) {
    return ExpanseModel.query(ctx.trx).context({ ctx })
  }

  @Query((returns) => ExpanseModel, { nullable: true })
  async expanse(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpanseModel.query(ctx.trx).where('id', id).first()
  }

  @Mutation((returns) => ExpanseModel)
  async upsertExpanse(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpansePayload)
    payload: UpsertExpansePayload
  ) {
    let existing: ExpanseModel | null = null
    if (payload.id) {
      existing = await ExpanseModel.getReference(payload.id, ctx.trx)
    } else {
      validateNeededArgs(payload, ['categoryId', 'value'])
    }

    const toUpsert = existing
      ? { id: existing.id, ...pick(payload, ExpanseModel.UPDATE_FIELDS) }
      : pick(payload, ExpanseModel.INSERT_FIELDS)

    return ExpanseModel.query(ctx.trx)
      .upsertGraphAndFetch(toUpsert, {
        insertMissing: true,
        relate: true,
        unrelate: true,
        noDelete: true,
      })
      .first()
      .context({ ctx })
  }

  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: ExpanseModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: ExpanseModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => ExpanseCategoryModel)
  category(@Root() model: ExpanseModel, @Ctx() ctx: RequestContext) {
    return ctx.loaders.expanseCategory.load(model.categoryId)
  }
}
