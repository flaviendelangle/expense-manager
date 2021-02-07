import { DateTimeResolver } from 'graphql-scalars'
import { Model, snakeCaseMappers, Transaction } from 'objection'
import { Field, ObjectType, ID, InputType } from 'type-graphql'

import { ExpanseCategoryModel } from '../expanseCategory/expanseCategory.model'

@ObjectType('Expanse')
export class ExpanseModel extends Model {
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

  static readonly INSERT_FIELDS: (keyof ExpanseModel)[] = ['description']

  static readonly UPDATE_FIELDS: (keyof ExpanseModel)[] = ['description']

  @Field((type) => ID)
  id: number | string

  @Field((type) => String, { nullable: true })
  description?: string

  createdAt: Date

  updatedAt: Date

  category: ExpanseCategoryModel
}

@InputType('UpsertExpansePayload')
export class UpsertExpansePayload {
  @Field((type) => String, { nullable: true })
  id: number | string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID, { nullable: true })
  category?: string | number
}
