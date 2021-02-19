import { Resolver, Ctx, Mutation, Arg } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { LoginPayload, UserModel } from '../../models/user'

@Resolver(UserModel)
export class UserMutationResolver {
  @Mutation((type) => UserModel)
  async login(
    @Ctx()
    ctx: RequestContext,
    @Arg('payload', (type) => LoginPayload)
    payload
  ) {
    const user = await UserModel.checkCredentials(payload, ctx.trx)

    await ctx.setJWT(user.id)

    return user
  }

  @Mutation((type) => Boolean)
  async logout(@Ctx() ctx: RequestContext) {
    ctx.removeJWT()

    return true
  }
}
