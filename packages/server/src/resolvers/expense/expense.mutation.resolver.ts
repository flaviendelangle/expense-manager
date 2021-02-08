import { pick } from 'lodash'
import { Resolver, Ctx, Arg, Mutation } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpenseModel, UpsertExpensePayload } from '../../models/expense'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(ExpenseModel)
export class ExpenseMutationResolver {
  @Mutation((returns) => ExpenseModel)
  async upsertExpense(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => UpsertExpensePayload)
    payload: UpsertExpensePayload
  ) {
    let existing: ExpenseModel | null = null
    if (payload.id) {
      existing = await ExpenseModel.getReference(payload.id, ctx.trx)
    } else {
      validateNeededArgs(payload, ['categoryId', 'value'])
    }

    const toUpsert = existing
      ? { id: existing.id, ...pick(payload, ExpenseModel.UPDATE_FIELDS) }
      : pick(payload, ExpenseModel.INSERT_FIELDS)

    return ExpenseModel.query(ctx.trx)
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
