import { pick } from 'lodash'
import { Transaction } from 'objection'
import { Field, ObjectType, ID } from 'type-graphql'

import { ApolloResourceNotFound } from '../../utils/errors'
import { PaginatedClass } from '../../utils/PaginatedClass'
import { validateNeededArgs } from '../../utils/validateNeededArgs'
import { BaseModel } from '../base/BaseModel'

import { UpsertExpenseCategoryPayload } from './expenseCategory.types'

@ObjectType('ExpenseCategory')
export class ExpenseCategoryModel extends BaseModel {
  static get tableName() {
    return 'expense_categories'
  }

  static get relationMappings() {
    return {}
  }

  static getReference(id: string | number, trx?: Transaction) {
    return ExpenseCategoryModel.query(trx).where('id', id).first()
  }

  static async upsertReference(
    payload: UpsertExpenseCategoryPayload,
    trx?: Transaction
  ) {
    if (payload.id) {
      const existing = await ExpenseCategoryModel.getReference(payload.id, trx)

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }

      return ExpenseCategoryModel.query(trx).updateAndFetchById(
        payload.id,
        pick(payload, ExpenseCategoryModel.UPDATE_FIELDS)
      )
    } else {
      validateNeededArgs(payload, ['name', 'expenseCategoryGroupId'])

      return ExpenseCategoryModel.query(trx)
        .insertAndFetch(pick(payload, ExpenseCategoryModel.INSERT_FIELDS))
        .first()
    }
  }

  static readonly INSERT_FIELDS: (keyof ExpenseCategoryModel)[] = [
    'description',
    'name',
    'expenseCategoryGroupId',
  ]

  static readonly UPDATE_FIELDS: (keyof ExpenseCategoryModel)[] = [
    'description',
    'name',
    'expenseCategoryGroupId',
  ]

  @Field((type) => String)
  name: string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID)
  expenseCategoryGroupId: string | number
}

@ObjectType('PaginatedExpenseCategory')
export class PaginatedExpenseCategory extends PaginatedClass(
  ExpenseCategoryModel
) {}
