import { DateTimeResolver } from 'graphql-scalars'
import { pick } from 'lodash'
import { Transaction } from 'objection'
import { Field, ObjectType, ID } from 'type-graphql'

import { ApolloResourceNotFound } from '../../utils/errors'
import { PaginatedClass } from '../../utils/PaginatedClass'
import { validateNeededArgs } from '../../utils/validateNeededArgs'
import { BaseModel } from '../base/BaseModel'
import { ExpenseCategoryModel } from '../expenseCategory'

import { UpsertExpensePayload } from './expense.types'

@ObjectType('Expense')
export class ExpenseModel extends BaseModel {
  static get tableName() {
    return 'expenses'
  }

  static get relationMappings() {
    return {}
  }

  static getReference(id: string | number, trx?: Transaction) {
    return ExpenseModel.query(trx).where('id', id).first()
  }

  static async upsertReference(
    payload: UpsertExpensePayload,
    trx?: Transaction
  ) {
    if (payload.id) {
      const existing = await ExpenseModel.getReference(payload.id, trx)

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }

      return ExpenseModel.query(trx)
        .updateAndFetchById(
          payload.id,
          pick(payload, ExpenseModel.UPDATE_FIELDS)
        )
        .first()
    } else {
      validateNeededArgs(payload, ['categoryId', 'value', 'spentAt'])

      return ExpenseModel.query(trx)
        .insertAndFetch(pick(payload, ExpenseModel.INSERT_FIELDS))
        .first()
    }
  }

  static readonly INSERT_FIELDS: (keyof ExpenseModel)[] = [
    'description',
    'categoryId',
    'value',
    'spentAt',
  ]

  static readonly UPDATE_FIELDS: (keyof ExpenseModel)[] = [
    'description',
    'categoryId',
    'value',
    'spentAt',
  ]

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID)
  categoryId: string | number

  @Field((type) => ExpenseCategoryModel)
  category: ExpenseCategoryModel

  @Field((type) => Number)
  value: number

  @Field((type) => DateTimeResolver)
  spentAt: Date
}

@ObjectType('PaginatedExpense')
export class PaginatedExpense extends PaginatedClass(ExpenseModel) {}
