import { pick } from 'lodash'
import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpanseCategoryModel,
  UpsertExpanseCategoryPayload,
} from '../../models/expanseCategory'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(ExpanseCategoryModel)
export class ExpanseCategoryMutationResolver {
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
}
