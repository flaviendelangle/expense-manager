import { Transaction } from 'objection'
import { Field, ObjectType, ID } from 'type-graphql'

import { PaginatedClass } from '../../utils/PaginatedClass'
import { BaseModel } from '../base/BaseModel'

@ObjectType('EarningCategory')
export class EarningCategoryModel extends BaseModel {
  static get tableName() {
    return 'earning_categories'
  }

  static get relationMappings() {
    return {}
  }

  static async getReference(id: string | number, trx?: Transaction) {
    return EarningCategoryModel.query(trx).where('id', id).first()
  }

  static readonly INSERT_FIELDS: (keyof EarningCategoryModel)[] = [
    'description',
    'name',
  ]

  static readonly UPDATE_FIELDS: (keyof EarningCategoryModel)[] = [
    'description',
    'name',
  ]

  @Field((type) => String)
  name: string

  @Field((type) => String, { nullable: true })
  description?: string
}

@ObjectType('PaginatedEarningCategory')
export class PaginatedEarningCategory extends PaginatedClass(
  EarningCategoryModel
) {}
