import { Transaction } from 'objection'
import { Field, ObjectType } from 'type-graphql'

import { PaginatedClass } from '../../utils/PaginatedClass'
import { BaseModel } from '../base/BaseModel'

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

@ObjectType('PaginatedExpenseCategoryGroup')
export class PaginatedExpenseCategoryGroup extends PaginatedClass(
  ExpenseCategoryGroupModel
) {}
