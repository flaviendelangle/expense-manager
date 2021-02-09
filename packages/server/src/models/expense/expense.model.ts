import { DateTimeResolver } from 'graphql-scalars'
import { snakeCaseMappers, Transaction } from 'objection'
import { Field, ObjectType, ID } from 'type-graphql'

import { PaginatedClass } from '../../utils/PaginatedClass'
import { BaseModel } from '../base/BaseModel'
import { ExpenseCategoryModel } from '../expenseCategory'

@ObjectType('Expense')
export class ExpenseModel extends BaseModel {
  static get tableName() {
    return 'expenses'
  }

  static get relationMappings() {
    return {}
  }

  static async getReference(id: string | number, trx?: Transaction) {
    return ExpenseModel.query(trx).where('id', id).first()
  }

  static get columnNameMappers() {
    return snakeCaseMappers({ underscoreBeforeDigits: true })
  }

  static readonly INSERT_FIELDS: (keyof ExpenseModel)[] = [
    'description',
    'categoryId',
    'value',
    'spentAt',
  ]

  static readonly UPDATE_FIELDS: (keyof ExpenseModel)[] = [
    'description',
    'categoryId',
    'value',
    'spentAt',
  ]

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID)
  categoryId: string | number

  @Field((type) => ExpenseCategoryModel)
  category: ExpenseCategoryModel

  @Field((type) => Number)
  value: number

  @Field((type) => DateTimeResolver)
  spentAt: Date
}

@ObjectType('PaginatedExpense')
export class PaginatedExpense extends PaginatedClass(ExpenseModel) {}
