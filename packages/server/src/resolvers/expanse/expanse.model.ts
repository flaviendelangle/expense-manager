import { DateTimeResolver } from 'graphql-scalars'
import { Model, snakeCaseMappers, Transaction } from 'objection'
import { Field, ObjectType, ID, InputType } from 'type-graphql'

@ObjectType('Expanse')
export class ExpanseModel extends Model {
  static get tableName() {
    return 'expanses'
  }

  static get relationMappings() {
    return {}
  }

  static async getReference(payload: Partial<ExpanseModel>, trx?: Transaction) {
    return ExpanseModel.query(trx).where('id', payload.id).first()
  }

  static get columnNameMappers() {
    return snakeCaseMappers({ underscoreBeforeDigits: true })
  }

  @Field((type) => ID)
  id: number | string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => DateTimeResolver)
  createdAt: Date
}

@InputType('UpsertExpansePayload')
export class UpsertExpansePayload {
  @Field((type) => String, { nullable: true })
  id: number | string

  @Field((type) => String, { nullable: true })
  description?: string
}
