import { Transaction } from 'objection'
import { Field, ObjectType, ID } from 'type-graphql'

import { PaginatedClass } from '../../utils/PaginatedClass'
import { BaseModel } from '../base/BaseModel'

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

@ObjectType('PaginatedExpenseCategory')
export class PaginatedExpenseCategory extends PaginatedClass(
  ExpenseCategoryModel
) {}
