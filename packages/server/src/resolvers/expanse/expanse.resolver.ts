import { DateTimeResolver } from 'graphql-scalars'
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
      existing = await ExpanseModel.getReference(payload, ctx.trx)
    }

    return ExpanseModel.query(ctx.trx)
      .upsertGraphAndFetch(payload, {
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
}
