import { pick } from 'lodash'
import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { EarningModel, UpsertEarningPayload } from '../../models/earning'
import { ApolloResourceNotFound } from '../../utils/errors'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(EarningModel)
export class EarningMutationResolver {
  @Mutation((returns) => EarningModel)
  async upsertEarning(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertEarningPayload)
    payload: UpsertEarningPayload
  ) {
    let existing: EarningModel | null = null
    if (payload.id) {
      existing = await EarningModel.getReference(payload.id, ctx.trx)

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }
    }

    if (!existing) {
      validateNeededArgs(payload, ['categoryId', 'value', 'spentAt'])
    }

    const toUpsert = existing
      ? { id: existing.id, ...pick(payload, EarningModel.UPDATE_FIELDS) }
      : pick(payload, EarningModel.INSERT_FIELDS)

    return EarningModel.query(ctx.trx)
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
