import { DateTimeResolver } from 'graphql-scalars'
import { snakeCaseMappers, Transaction } from 'objection'
import { Field, ObjectType, ID, InputType } from 'type-graphql'

import { BaseModel } from '../BaseModel'
import { ExpanseCategoryModel } from '../expanseCategory'

@ObjectType('Expanse')
export class ExpanseModel extends BaseModel {
  static get tableName() {
    return 'expanses'
  }

  static get relationMappings() {
    return {}
  }

  static async getReference(id: string | number, trx?: Transaction) {
    return ExpanseModel.query(trx).where('id', id).first()
  }

  static get columnNameMappers() {
    return snakeCaseMappers({ underscoreBeforeDigits: true })
  }

  static readonly INSERT_FIELDS: (keyof ExpanseModel)[] = [
    'description',
    'categoryId',
    'value',
  ]

  static readonly UPDATE_FIELDS: (keyof ExpanseModel)[] = [
    'description',
    'categoryId',
    'value',
  ]

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID)
  categoryId: string | number

  @Field((type) => ExpanseCategoryModel)
  category: ExpanseCategoryModel

  @Field((type) => Number)
  value: number
}

@InputType('UpsertExpansePayload')
export class UpsertExpansePayload {
  @Field((type) => String, { nullable: true })
  id?: number | string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID, { nullable: true })
  categoryId?: string | number

  @Field((type) => Number, { nullable: true })
  value?: number
}
