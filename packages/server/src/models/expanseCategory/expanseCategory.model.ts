import { Transaction } from 'objection'
import { Field, ObjectType, InputType } from 'type-graphql'

import { BaseModel } from '../BaseModel'

@ObjectType('ExpanseCategory')
export class ExpanseCategoryModel extends BaseModel {
  static get tableName() {
    return 'expanse_categories'
  }

  static get relationMappings() {
    return {}
  }

  static async getReference(id: string | number, trx?: Transaction) {
    return ExpanseCategoryModel.query(trx).where('id', id).first()
  }

  static readonly INSERT_FIELDS: (keyof ExpanseCategoryModel)[] = [
    'description',
    'name',
  ]

  static readonly UPDATE_FIELDS: (keyof ExpanseCategoryModel)[] = [
    'description',
    'name',
  ]

  @Field((type) => String)
  name: string

  @Field((type) => String, { nullable: true })
  description?: string
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
