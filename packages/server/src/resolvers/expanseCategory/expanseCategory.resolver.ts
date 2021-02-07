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

import {
  ExpanseCategoryModel,
  UpsertExpanseCategoryPayload,
} from './expanseCategory.model'

@Resolver(ExpanseCategoryModel)
export class ExpanseResolver {
  @Query((returns) => [ExpanseCategoryModel!])
  async expanseCategories(
    @Ctx()
    ctx: RequestContext
  ) {
    return ExpanseCategoryModel.query(ctx.trx).context({ ctx })
  }

  @Query((returns) => ExpanseCategoryModel, { nullable: true })
  async expanseCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpanseCategoryModel.query(ctx.trx).where('id', id).first()
  }

  @Mutation((returns) => ExpanseCategoryModel)
  async upsertExpanseCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpanseCategoryPayload)
    payload: UpsertExpanseCategoryPayload
  ) {
    let existing: ExpanseCategoryModel | null = null
    if (payload.id) {
      existing = await ExpanseCategoryModel.getReference(payload.id, ctx.trx)
    } else {
      validateNeededArgs(payload, ['name'])
    }

    const toUpsert = existing
      ? {
          id: existing.id,
          ...pick(payload, ExpanseCategoryModel.UPDATE_FIELDS),
        }
      : pick(payload, ExpanseCategoryModel.INSERT_FIELDS)

    return ExpanseCategoryModel.query(ctx.trx)
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
  createdAt(@Root() model: ExpanseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: ExpanseCategoryModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }
}
