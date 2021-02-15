import { GraphQLDateTime } from 'graphql-scalars'
import { Field, ID, InputType } from 'type-graphql'

import { DateFilter } from '../base/ParseFilters'

@InputType('UpsertRefundPayload')
export class UpsertRefundPayload {
  @Field((type) => ID, { nullable: true })
  id?: number | string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID, { nullable: true })
  earningCategoryId?: string | number

  @Field((type) => Number, { nullable: true })
  value?: number

  @Field((type) => GraphQLDateTime, { nullable: true })
  refundedAt?: Date
}

@InputType('RefundFilters')
export class RefundFilters {
  @Field((type) => [ID!], { nullable: true })
  ids?: (string | number)[]

  @Field((type) => [ID!], { nullable: true })
  earningCategoryIds?: (string | number)[]

  @Field((type) => DateFilter, { nullable: true })
  refundedAt?: DateFilter
}
