import {
  Ctx,
  Field,
  FieldResolver,
  ID,
  ObjectType,
  Resolver,
} from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { UserModel } from '../../models/user'

@ObjectType('ServerStatus')
export class ServerStatus {
  @Field((type) => ID)
  id: string | number = 1
}

export const hasServerBeenInitialized = async () => {
  const { total } = ((await UserModel.query()
    .count(`${UserModel.tableName}.id`, { as: 'total' })
    .first()) as unknown) as { total: number }

  return total > 0
}

@Resolver(ServerStatus)
export class ServerStatusFieldResolver {
  @FieldResolver((type) => Boolean)
  async hasBeenInitialized(@Ctx() ctx: RequestContext) {
    return hasServerBeenInitialized()
  }
}
