import { pick } from 'lodash'
import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  EarningCategoryModel,
  UpsertEarningCategoryPayload,
} from '../../models/earningCategory'
import { ApolloResourceNotFound } from '../../utils/errors'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(EarningCategoryModel)
export class EarningCategoryMutationResolver {
  @Mutation((returns) => EarningCategoryModel)
  async upsertEarningCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertEarningCategoryPayload)
    payload: UpsertEarningCategoryPayload
  ) {
    let existing: EarningCategoryModel | null = null
    if (payload.id) {
      existing = await EarningCategoryModel.getReference(payload.id, ctx.trx)

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }
    }

    if (!existing) {
      validateNeededArgs(payload, ['name'])
    }

    const toUpsert = existing
      ? {
          id: existing.id,
          ...pick(payload, EarningCategoryModel.UPDATE_FIELDS),
        }
      : pick(payload, EarningCategoryModel.INSERT_FIELDS)

    return EarningCategoryModel.query(ctx.trx)
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
