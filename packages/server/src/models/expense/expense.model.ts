import { DateTimeResolver } from 'graphql-scalars'
import { pick } from 'lodash'
import { Transaction } from 'objection'
import { Field, ObjectType, ID } from 'type-graphql'

import { ApolloResourceNotFound } from '../../utils/errors'
import { PaginatedClass } from '../../utils/PaginatedClass'
import { validateNeededArgs } from '../../utils/validateNeededArgs'
import { BaseModel } from '../base/BaseModel'
import { ExpenseCategoryModel } from '../expenseCategory'
import { RefundModel } from '../refund'

import { expenseRelationMappings } from './expense.relations'
import { UpsertExpensePayload } from './expense.types'

@ObjectType('Expense')
export class ExpenseModel extends BaseModel {
  static get tableName() {
    return 'expenses'
  }

  static get relationMappings() {
    return expenseRelationMappings()
  }

  static getReference(id: string | number, trx?: Transaction) {
    return ExpenseModel.query(trx).where('id', id).first()
  }

  static async upsertReference(
    payload: UpsertExpensePayload,
    trx?: Transaction
  ) {
    let cleanPayload: UpsertExpensePayload

    if (payload.id) {
      const existing = await ExpenseModel.getReference(payload.id, trx)

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }

      cleanPayload = pick(payload, ExpenseModel.UPDATE_FIELDS)
    } else {
      validateNeededArgs(payload, ['expenseCategoryId', 'value', 'spentAt'])

      cleanPayload = pick(payload, ExpenseModel.INSERT_FIELDS)
    }

    return ExpenseModel.query(trx)
      .upsertGraphAndFetch(cleanPayload, {
        insertMissing: true,
        noDelete: false,
        relate: true,
        unrelate: true,
      })
      .first()
  }

  static readonly INSERT_FIELDS: (keyof ExpenseModel)[] = [
    'description',
    'expenseCategoryId',
    'value',
    'spentAt',
    'refund',
  ]

  static readonly UPDATE_FIELDS: (keyof ExpenseModel)[] = [
    'id',
    'description',
    'expenseCategoryId',
    'value',
    'spentAt',
    'refund',
  ]

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID, { nullable: true })
  refundId?: string | number

  @Field((type) => RefundModel, { nullable: true })
  refund?: RefundModel

  @Field((type) => ID)
  expenseCategoryId: string | number

  @Field((type) => ExpenseCategoryModel)
  expenseCategory: ExpenseCategoryModel

  @Field((type) => Number)
  value: number

  @Field((type) => DateTimeResolver)
  spentAt: Date
}

@ObjectType('PaginatedExpense')
export class PaginatedExpense extends PaginatedClass(ExpenseModel) {}
