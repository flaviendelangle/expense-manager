import { pick } from 'lodash'
import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseCategoryGroupModel,
  UpsertExpenseCategoryGroupPayload,
} from '../../models/expenseCategoryGroup'
import { ApolloResourceNotFound } from '../../utils/errors'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(ExpenseCategoryGroupModel)
export class ExpenseCategoryGroupMutationResolver {
  @Mutation((returns) => ExpenseCategoryGroupModel)
  async upsertExpenseCategoryGroup(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpenseCategoryGroupPayload)
    payload: UpsertExpenseCategoryGroupPayload
  ) {
    let existing: ExpenseCategoryGroupModel | null = null
    if (payload.id) {
      existing = await ExpenseCategoryGroupModel.getReference(
        payload.id,
        ctx.trx
      )

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
          ...pick(payload, ExpenseCategoryGroupModel.UPDATE_FIELDS),
        }
      : pick(payload, ExpenseCategoryGroupModel.INSERT_FIELDS)

    return ExpenseCategoryGroupModel.query(ctx.trx)
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
