import { DateTimeResolver } from 'graphql-scalars'
import { snakeCaseMappers, Transaction } from 'objection'
import { Field, ObjectType, ID } from 'type-graphql'

import { PaginatedClass } from '../../utils/PaginatedClass'
import { BaseModel } from '../base/BaseModel'
import { EarningCategoryModel } from '../earningCategory'

@ObjectType('Earning')
export class EarningModel extends BaseModel {
  static get tableName() {
    return 'earnings'
  }

  static get relationMappings() {
    return {}
  }

  static async getReference(id: string | number, trx?: Transaction) {
    return EarningModel.query(trx).where('id', id).first()
  }

  static get columnNameMappers() {
    return snakeCaseMappers({ underscoreBeforeDigits: true })
  }

  static readonly INSERT_FIELDS: (keyof EarningModel)[] = [
    'description',
    'categoryId',
    'value',
    'spentAt',
  ]

  static readonly UPDATE_FIELDS: (keyof EarningModel)[] = [
    'description',
    'categoryId',
    'value',
    'spentAt',
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
  spentAt: Date
}

@ObjectType('PaginatedEarning')
export class PaginatedEarning extends PaginatedClass(EarningModel) {}
