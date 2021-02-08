import { pick } from 'lodash'
import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpanseModel, UpsertExpansePayload } from '../../models/expanse'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(ExpanseModel)
export class ExpanseMutationResolver {
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
}
