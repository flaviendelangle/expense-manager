import { DateTimeResolver } from 'graphql-scalars'
import { Model, snakeCaseMappers, Transaction } from 'objection'
import { Field, ObjectType, ID, InputType } from 'type-graphql'

@ObjectType('ExpanseCategory')
export class ExpanseCategoryModel extends Model {
  static get tableName() {
    return 'expanse_categories'
  }

  static get relationMappings() {
    return {}
  }

  static async getReference(id: string | number, trx?: Transaction) {
    return ExpanseCategoryModel.query(trx).where('id', id).first()
  }

  static get columnNameMappers() {
    return snakeCaseMappers({ underscoreBeforeDigits: true })
  }

  static readonly INSERT_FIELDS: (keyof ExpanseCategoryModel)[] = [
    'description',
    'name',
  ]

  static readonly UPDATE_FIELDS: (keyof ExpanseCategoryModel)[] = [
    'description',
    'name',
  ]

  @Field((type) => ID)
  id: number | string

  @Field((type) => String)
  name: string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => DateTimeResolver)
  createdAt: Date

  @Field((type) => DateTimeResolver)
  updateAt: Date
}

@InputType('UpsertExpanseCategoryPayload')
export class UpsertExpanseCategoryPayload {
  @Field((type) => String, { nullable: true })
  id: number | string

  @Field((type) => String, { nullable: true })
  name: string

  @Field((type) => String, { nullable: true })
  description?: string
}
