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
import { validateNeededArgs } from '../../utils/validateNeededArgs'
import { ExpanseCategoryModel } from '../expanseCategory/expanseCategory.model'

import { ExpanseModel, UpsertExpansePayload } from './expanse.model'

@Resolver(ExpanseModel)
export class ExpanseResolver {
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
      validateNeededArgs(payload, ['category'])
    }

    const cleanPayload = {
      ...payload,
      ...(!!payload.category && { category: { id: payload.category } }),
    }

    const toUpsert = existing
      ? { id: existing.id, ...pick(cleanPayload, ExpanseModel.UPDATE_FIELDS) }
      : pick(cleanPayload, ExpanseModel.INSERT_FIELDS)

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
    return ExpanseCategoryModel.query(ctx.trx)
      .joinRelated('expanses')
      .where('expanses.id', model.id)
      .first()
      .context({ ctx })
  }
}
