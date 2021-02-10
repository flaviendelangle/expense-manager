import { Field, ID, InputType } from 'type-graphql'

@InputType('UpsertEarningCategoryPayload')
export class UpsertEarningCategoryPayload {
  @Field((type) => String, { nullable: true })
  id: number | string

  @Field((type) => String, { nullable: true })
  name: string

  @Field((type) => String, { nullable: true })
  description?: string
}

@InputType('EarningCategoryFilters')
export class EarningCategoryFilters {
  @Field((type) => [ID!], { nullable: true })
  ids?: (string | number)[]
}
