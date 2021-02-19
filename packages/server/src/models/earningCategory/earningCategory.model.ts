import { pick } from 'lodash'
import { Transaction } from 'objection'
import { Field, ObjectType } from 'type-graphql'

import { ApolloForbidden, ApolloResourceNotFound } from '../../utils/errors'
import { PaginatedClass } from '../../utils/PaginatedClass'
import { validateNeededArgs } from '../../utils/validateNeededArgs'
import { BaseModel } from '../base/BaseModel'

import { UpsertEarningCategoryPayload } from './earningCategory.types'

@ObjectType('EarningCategory')
export class EarningCategoryModel extends BaseModel {
  static get tableName() {
    return 'earning_categories'
  }

  static get relationMappings() {
    return {}
  }

  static getReference(id: string | number, trx?: Transaction) {
    return EarningCategoryModel.query(trx).where('id', id).first()
  }

  static async upsertReference(
    userId: string | number,
    payload: UpsertEarningCategoryPayload,
    trx?: Transaction
  ) {
    if (payload.id) {
      const existing = await EarningCategoryModel.getReference(payload.id, trx)

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }

      if (existing.userId !== userId) {
        throw new ApolloForbidden({
          message: 'Wrong user',
        })
      }

      return EarningCategoryModel.query(trx)
        .updateAndFetchById(
          payload.id,
          pick(payload, EarningCategoryModel.UPDATE_FIELDS)
        )
        .first()
    } else {
      validateNeededArgs(payload, ['name'])

      return EarningCategoryModel.query(trx)
        .insertAndFetch({
          ...pick(payload, EarningCategoryModel.INSERT_FIELDS),
          userId,
        })
        .first()
    }
  }

  static readonly INSERT_FIELDS: (keyof EarningCategoryModel)[] = [
    'description',
    'name',
  ]

  static readonly UPDATE_FIELDS: (keyof EarningCategoryModel)[] = [
    'description',
    'name',
  ]

  @Field((type) => String)
  name: string

  @Field((type) => String, { nullable: true })
  description?: string

  userId: string | number
}

@ObjectType('PaginatedEarningCategory')
export class PaginatedEarningCategory extends PaginatedClass(
  EarningCategoryModel
) {}
