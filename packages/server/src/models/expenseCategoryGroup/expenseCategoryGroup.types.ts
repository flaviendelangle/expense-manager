import { Field, ID, InputType } from 'type-graphql'

@InputType('UpsertExpenseCategoryGroupPayload')
export class UpsertExpenseCategoryGroupPayload {
  @Field((type) => String, { nullable: true })
  id: number | string

  @Field((type) => String, { nullable: true })
  name: string

  @Field((type) => String, { nullable: true })
  description?: string
}

@InputType('ExpenseCategoryGroupFilters')
export class ExpenseCategoryGroupFilters {
  @Field((type) => [ID!], { nullable: true })
  ids?: (string | number)[]

  @Field((type) => [ID!], { nullable: true })
  categoryGroupIds?: (string | number)[]
}
