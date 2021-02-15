import { GraphQLDateTime } from 'graphql-scalars'
import { Field, ID, InputType } from 'type-graphql'

import { DateFilter } from '../base/ParseFilters'
import { UpsertRefundPayload } from '../refund'

@InputType('UpsertExpensePayload')
export class UpsertExpensePayload {
  @Field((type) => ID, { nullable: true })
  id?: number | string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID, { nullable: true })
  expenseCategoryId?: string | number

  @Field((type) => Number, { nullable: true })
  value?: number

  @Field((type) => GraphQLDateTime, { nullable: true })
  spentAt?: Date

  @Field((type) => UpsertRefundPayload, { nullable: true })
  refund?: UpsertRefundPayload
}

@InputType('ExpenseFilters')
export class ExpenseFilters {
  @Field((type) => [ID!], { nullable: true })
  ids?: (string | number)[]

  @Field((type) => [ID!], { nullable: true })
  expenseCategoryIds?: (string | number)[]

  @Field((type) => DateFilter, { nullable: true })
  spentAt?: DateFilter
}
