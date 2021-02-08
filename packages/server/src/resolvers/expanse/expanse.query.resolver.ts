import { Query, Resolver, Ctx, Arg, ID } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import { ExpanseModel } from '../../models/expanse'

@Resolver(ExpanseModel)
export class ExpanseQueryResolver {
  @Query((returns) => [ExpanseModel!])
  async expanses(
    @Ctx()
    ctx: RequestContext
  ) {
    return ExpanseModel.query(ctx.trx).context({ ctx })
  }

  @Query((returns) => ExpanseModel, { nullable: true })
  async expanse(
    @Ctx()
    ctx: RequestContext,
    @Arg('id', (type) => ID)
    id: string
  ) {
    return ExpanseModel.query(ctx.trx).where('id', id).first()
  }
}
