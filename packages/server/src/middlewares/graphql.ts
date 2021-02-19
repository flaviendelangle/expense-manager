import { buildSchemaSync } from 'type-graphql'
import { AuthChecker } from 'type-graphql'

import { RequestContext } from '../globalTypes'

const customAuthChecker: AuthChecker<RequestContext> = ({ context }, roles) => {
  if (roles.length) {
    // Roles check is not implemented yet
    return false
  }

  return !!context.user
}

export const schema = buildSchemaSync({
  resolvers: [`${__dirname}/../resolvers/**/*.resolver.ts`],
  emitSchemaFile: `${__dirname}/../../../../schema.graphql`,
  authChecker: customAuthChecker,
})
