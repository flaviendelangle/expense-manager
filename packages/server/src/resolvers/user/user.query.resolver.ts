import { Resolver, Query, Ctx } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { UserModel } from '../../models/user'

@Resolver(UserModel)
export class UserQueryResolver {
  @Query((type) => UserModel, { nullable: true })
  async me(@Ctx() ctx: RequestContext) {
    const userId = ctx.userId

    if (!userId) {
      return null
    }

    return UserModel.getReference(userId, ctx.trx)
  }
}
