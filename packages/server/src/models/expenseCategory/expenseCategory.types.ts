import { Field, ID, InputType } from 'type-graphql'

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

@InputType('ExpenseCategoryFilters')
export class ExpenseCategoryFilters {
  @Field((type) => [ID!], { nullable: true })
  ids?: (string | number)[]

  @Field((type) => [ID!], { nullable: true })
  categoryGroupIds?: (string | number)[]
}
