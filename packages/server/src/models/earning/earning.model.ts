import { DateTimeResolver } from 'graphql-scalars'
import { pick } from 'lodash'
import { Transaction } from 'objection'
import { Field, ObjectType, ID } from 'type-graphql'

import { ApolloResourceNotFound } from '../../utils/errors'
import { PaginatedClass } from '../../utils/PaginatedClass'
import { validateNeededArgs } from '../../utils/validateNeededArgs'
import { BaseModel } from '../base/BaseModel'
import { EarningCategoryModel } from '../earningCategory'

import { UpsertEarningPayload } from './earning.types'

@ObjectType('Earning')
export class EarningModel extends BaseModel {
  static get tableName() {
    return 'earnings'
  }

  static get relationMappings() {
    return {}
  }

  static getReference(id: string | number, trx?: Transaction) {
    return EarningModel.query(trx).where('id', id).first()
  }

  static async upsertReference(
    payload: UpsertEarningPayload,
    trx?: Transaction
  ) {
    if (payload.id) {
      const existing = await EarningModel.getReference(payload.id, trx)

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }

      return EarningModel.query(trx)
        .updateAndFetchById(
          payload.id,
          pick(payload, EarningModel.UPDATE_FIELDS)
        )
        .first()
    } else {
      validateNeededArgs(payload, ['categoryId', 'value', 'earnedAt'])

      return EarningModel.query(trx)
        .insertAndFetch(pick(payload, EarningModel.INSERT_FIELDS))
        .first()
    }
  }

  static readonly INSERT_FIELDS: (keyof EarningModel)[] = [
    'description',
    'categoryId',
    'value',
    'earnedAt',
  ]

  static readonly UPDATE_FIELDS: (keyof EarningModel)[] = [
    'description',
    'categoryId',
    'value',
    'earnedAt',
  ]

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID)
  categoryId: string | number

  @Field((type) => EarningCategoryModel)
  category: EarningCategoryModel

  @Field((type) => Number)
  value: number

  @Field((type) => DateTimeResolver)
  earnedAt: Date
}

@ObjectType('PaginatedEarning')
export class PaginatedEarning extends PaginatedClass(EarningModel) {}
