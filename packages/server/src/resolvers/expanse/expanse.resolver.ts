import { Query, Resolver } from 'type-graphql'

import { ExpanseModel } from './expanse.model'

@Resolver(ExpanseModel)
export class ExpanseResolver {
  @Query((returns) => [ExpanseModel!]!)
  expanses() {
    return []
  }
}
