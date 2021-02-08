import { pick } from 'lodash'
import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  ExpenseCategoryModel,
  UpsertExpenseCategoryPayload,
} from '../../models/expenseCategory'
import { ApolloResourceNotFound } from '../../utils/errors'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(ExpenseCategoryModel)
export class ExpenseCategoryMutationResolver {
  @Mutation((returns) => ExpenseCategoryModel)
  async upsertExpenseCategory(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpenseCategoryPayload)
    payload: UpsertExpenseCategoryPayload
  ) {
    let existing: ExpenseCategoryModel | null = null
    if (payload.id) {
      existing = await ExpenseCategoryModel.getReference(payload.id, ctx.trx)

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }
    }

    if (!existing) {
      validateNeededArgs(payload, ['name', 'categoryGroupId'])
    }

    const toUpsert = existing
      ? {
          id: existing.id,
          ...pick(payload, ExpenseCategoryModel.UPDATE_FIELDS),
        }
      : pick(payload, ExpenseCategoryModel.INSERT_FIELDS)

    return ExpenseCategoryModel.query(ctx.trx)
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
