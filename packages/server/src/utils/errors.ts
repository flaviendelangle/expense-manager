import { ApolloError } from 'apollo-server-core'

enum ErrorCodes {
  MISSING_ARGS = 'MISSING_ARGS',
}

export class ApolloErrorMissingArgs extends ApolloError {
  constructor(properties?: Record<string, any>) {
    const message = properties?.message ?? ErrorCodes.MISSING_ARGS
    super(message, ErrorCodes.MISSING_ARGS, properties)

    this.extensions.status = 400

    Object.defineProperty(this, 'name', { value: ErrorCodes.MISSING_ARGS })
  }
}
