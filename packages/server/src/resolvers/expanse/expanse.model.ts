import { Field, ObjectType, ID } from 'type-graphql'

@ObjectType('Expanse')
export class ExpanseModel {
  @Field((type) => ID)
  id: number | string
}
