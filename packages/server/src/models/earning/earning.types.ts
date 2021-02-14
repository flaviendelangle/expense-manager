import { GraphQLDateTime } from 'graphql-scalars'
import { Field, ID, InputType } from 'type-graphql'

import { DateFilter } from '../base/ParseFilters'

@InputType('UpsertEarningPayload')
export class UpsertEarningPayload {
  @Field((type) => ID, { nullable: true })
  id?: number | string

  @Field((type) => String, { nullable: true })
  description?: string

  @Field((type) => ID, { nullable: true })
  categoryId?: string | number

  @Field((type) => Number, { nullable: true })
  value?: number

  @Field((type) => GraphQLDateTime, { nullable: true })
  earnedAt?: Date
}

@InputType('EarningFilters')
export class EarningFilters {
  @Field((type) => [ID!], { nullable: true })
  ids?: (string | number)[]

  @Field((type) => [ID!], { nullable: true })
  categoryIds?: (string | number)[]

  @Field((type) => DateFilter, { nullable: true })
  earnedAt?: DateFilter
}
