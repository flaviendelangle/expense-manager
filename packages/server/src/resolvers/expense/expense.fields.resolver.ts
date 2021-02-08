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
import { ExpenseModel, UpsertExpensePayload } from '../../models/expense'
import { ExpenseCategoryModel } from '../../models/expenseCategory'
import { validateNeededArgs } from '../../utils/validateNeededArgs'

@Resolver(ExpenseModel)
export class ExpenseFieldsResolver {
  @Query((returns) => [ExpenseModel!])
  async expenses(
    @Ctx()
    ctx: RequestContext
  ) {
    return ExpenseModel.query(ctx.trx).context({ ctx })
  }

  @Query((returns) => ExpenseModel, { nullable: true })
  async expense(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpenseModel.query(ctx.trx).where('id', id).first()
  }

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

  @FieldResolver((type) => DateTimeResolver)
  createdAt(@Root() model: ExpenseModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => DateTimeResolver)
  updatedAt(@Root() model: ExpenseModel, @Ctx() ctx: RequestContext) {
    return new Date(model.createdAt)
  }

  @FieldResolver((type) => ExpenseCategoryModel)
  category(@Root() model: ExpenseModel, @Ctx() ctx: RequestContext) {
    return ctx.loaders.expenseCategory.load(model.categoryId)
  }
}
