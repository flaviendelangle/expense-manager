import { Query, Resolver } from 'type-graphql'

import { ServerStatus } from './serverStatus.field.resolver'

@Resolver(ServerStatus)
class ServerStatusQueryResolver {
  @Query((type) => ServerStatus)
  serverStatus() {
    return new ServerStatus()
  }
}
