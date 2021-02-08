import { get, isEmpty, isUndefined } from 'lodash'

import { ApolloErrorMissingArgs } from './errors'

export const validateNeededArgs = <Args extends {}>(
  args: Args,
  neededArgs: (keyof Args)[]
) => {
  const missingArgs = []
  neededArgs.map((neededArg) => {
    if (isUndefined(get(args, neededArg))) {
      missingArgs.push(neededArg)
    }
    if (
      typeof args[neededArg] === 'object' &&
      !(args[neededArg] instanceof Date)
    ) {
      if (isEmpty(args[neededArg])) missingArgs.push(neededArg)
    }

    return null
  })

  if (missingArgs.length > 0) {
    throw new ApolloErrorMissingArgs({
      missingArgs,
      payload: args,
    })
  }
}
