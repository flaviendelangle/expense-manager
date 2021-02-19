import { Field, InputType } from 'type-graphql'

@InputType('InsertUserPayload')
export class InsertUserPayload {
  @Field((type) => String)
  email: string

  @Field((type) => String)
  password: string
}

@InputType('LoginPayload')
export class LoginPayload {
  @Field((type) => String)
  email: string

  @Field((type) => String)
  password: string
}
