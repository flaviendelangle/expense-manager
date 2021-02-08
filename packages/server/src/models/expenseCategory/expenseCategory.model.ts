import { Transaction } from 'objection'
import { Field, ObjectType, InputType, ID } from 'type-graphql'

import { BaseModel } from '../BaseModel'

@ObjectType('ExpenseCategory')
export class ExpenseCategoryModel extends BaseModel {
  static get tableName() {
    return 'expense_categories'
  }

  static get relationMappings() {
    return {}
  }

  static async getReference(id: string | number, trx?: Transaction) {
    return ExpenseCategoryModel.query(trx).where('id', id).first()
  }

  static readonly INSERT_FIELDS: (keyof ExpenseCategoryModel)[] = [
    'description',
    'name',
    'categoryGroupId',
  ]

  static readonly UPDATE_FIELDS: (keyof ExpenseCategoryModel)[] = [
    'description',
    'name',
    'categoryGroupId',
  ]

  @Field((type) => String)
  name: string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID)
  categoryGroupId: string | number
}

@InputType('UpsertExpenseCategoryPayload')
export class UpsertExpenseCategoryPayload {
  @Field((type) => String, { nullable: true })
  id: number | string

  @Field((type) => String, { nullable: true })
  name: string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID, { nullable: true })
  categoryGroupId?: string | number
}
