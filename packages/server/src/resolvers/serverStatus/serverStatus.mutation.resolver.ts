import { Arg, Mutation, Resolver } from 'type-graphql'

import { UserModel, InsertUserPayload } from '../../models/user'
import { ApolloForbidden } from '../../utils/errors'

import {
  ServerStatus,
  hasServerBeenInitialized,
} from './serverStatus.field.resolver'

@Resolver(ServerStatus)
export class ServerStatusMutationResolver {
  @Mutation((returns) => ServerStatus)
  async initializeServer(
    @Arg('adminPayload', (type) => InsertUserPayload)
    adminPayload: InsertUserPayload
  ) {
    const hasBeenInitialized = await hasServerBeenInitialized()

    if (hasBeenInitialized) {
      throw new ApolloForbidden({
        message: 'Server already initialized',
      })
    }

    await UserModel.insertReference(adminPayload, true)

    return new ServerStatus()
  }
}
