import { pick } from 'lodash'
import { Transaction } from 'objection'
import { Field, ObjectType } from 'type-graphql'

import { ApolloForbidden, ApolloResourceNotFound } from '../../utils/errors'
import { PaginatedClass } from '../../utils/PaginatedClass'
import { validateNeededArgs } from '../../utils/validateNeededArgs'
import { BaseModel } from '../base/BaseModel'

import { UpsertExpenseCategoryGroupPayload } from './expenseCategoryGroup.types'

@ObjectType('ExpenseCategoryGroup')
export class ExpenseCategoryGroupModel extends BaseModel {
  static get tableName() {
    return 'expense_category_groups'
  }

  static get relationMappings() {
    return {}
  }

  static getReference(id: string | number, trx?: Transaction) {
    return ExpenseCategoryGroupModel.query(trx).where('id', id).first()
  }

  static async upsertReference(
    userId: string | number,
    payload: UpsertExpenseCategoryGroupPayload,
    trx?: Transaction
  ) {
    if (payload.id) {
      const existing = await ExpenseCategoryGroupModel.getReference(
        payload.id,
        trx
      )

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }

      if (existing.userId !== userId) {
        throw new ApolloForbidden({
          message: 'Wrong user',
        })
      }

      return ExpenseCategoryGroupModel.query(trx)
        .updateAndFetchById(
          payload.id,
          pick(payload, ExpenseCategoryGroupModel.UPDATE_FIELDS)
        )
        .first()
    } else {
      validateNeededArgs(payload, ['name'])

      return ExpenseCategoryGroupModel.query(trx).insertAndFetch({
        ...pick(payload, ExpenseCategoryGroupModel.INSERT_FIELDS),
        userId,
      })
    }
  }

  static readonly INSERT_FIELDS: (keyof ExpenseCategoryGroupModel)[] = [
    'description',
    'name',
  ]

  static readonly UPDATE_FIELDS: (keyof ExpenseCategoryGroupModel)[] = [
    'description',
    'name',
  ]

  @Field((type) => String)
  name: string

  @Field((type) => String, { nullable: true })
  description?: string

  userId: string | number
}

@ObjectType('PaginatedExpenseCategoryGroup')
export class PaginatedExpenseCategoryGroup extends PaginatedClass(
  ExpenseCategoryGroupModel
) {}
