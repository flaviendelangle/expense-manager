import { Model, Transaction } from 'objection'
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

  @Field((type) => ID)
  id: number | string

  @Field((type) => String, { nullable: true })
  description?: string
}

@InputType('UpsertExpansePayload')
export class UpsertExpansePayload {
  @Field((type) => String, { nullable: true })
  id: number | string

  @Field((type) => String, { nullable: true })
  description?: string
}
