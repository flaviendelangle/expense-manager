import { DateTimeResolver } from 'graphql-scalars'
import { pick } from 'lodash'
import { Transaction } from 'objection'
import { Field, ObjectType, ID } from 'type-graphql'

import { ApolloResourceNotFound } from '../../utils/errors'
import { PaginatedClass } from '../../utils/PaginatedClass'
import { validateNeededArgs } from '../../utils/validateNeededArgs'
import { BaseModel } from '../base/BaseModel'
import { EarningCategoryModel } from '../earningCategory'

import { UpsertRefundPayload } from './refund.types'

@ObjectType('Refund')
export class RefundModel extends BaseModel {
  static get tableName() {
    return 'refunds'
  }

  static get relationMappings() {
    return {}
  }

  static getReference(id: string | number, trx?: Transaction) {
    return RefundModel.query(trx).where('id', id).first()
  }

  static async upsertReference(
    payload: UpsertRefundPayload,
    trx?: Transaction
  ) {
    if (payload.id) {
      const existing = await RefundModel.getReference(payload.id, trx)

      if (!existing) {
        throw new ApolloResourceNotFound({ payload })
      }

      return RefundModel.query(trx)
        .updateAndFetchById(
          payload.id,
          pick(payload, RefundModel.UPDATE_FIELDS)
        )
        .first()
    } else {
      validateNeededArgs(payload, ['earningCategoryId', 'value', 'refundedAt'])

      return RefundModel.query(trx)
        .insertAndFetch(pick(payload, RefundModel.INSERT_FIELDS))
        .first()
    }
  }

  static readonly INSERT_FIELDS: (keyof RefundModel)[] = [
    'description',
    'earningCategoryId',
    'value',
    'refundedAt',
  ]

  static readonly UPDATE_FIELDS: (keyof RefundModel)[] = [
    'description',
    'earningCategoryId',
    'value',
    'refundedAt',
  ]

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID)
  earningCategoryId: string | number

  @Field((type) => EarningCategoryModel)
  earningCategory: EarningCategoryModel

  @Field((type) => Number)
  value: number

  @Field((type) => DateTimeResolver)
  refundedAt: Date
}

@ObjectType('PaginatedRefund')
export class PaginatedRefund extends PaginatedClass(RefundModel) {}
