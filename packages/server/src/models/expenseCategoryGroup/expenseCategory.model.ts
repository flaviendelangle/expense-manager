import { Transaction } from 'objection'
import { Field, ObjectType, InputType } from 'type-graphql'

import { BaseModel } from '../BaseModel'

@ObjectType('ExpenseCategoryGroup')
export class ExpenseCategoryGroupModel extends BaseModel {
  static get tableName() {
    return 'expense_category_groups'
  }

  static get relationMappings() {
    return {}
  }

  static async getReference(id: string | number, trx?: Transaction) {
    return ExpenseCategoryGroupModel.query(trx).where('id', id).first()
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
}

@InputType('UpsertExpenseCategoryGroupPayload')
export class UpsertExpenseCategoryGroupPayload {
  @Field((type) => String, { nullable: true })
  id: number | string

  @Field((type) => String, { nullable: true })
  name: string

  @Field((type) => String, { nullable: true })
  description?: string
}
