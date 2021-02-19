import { ApolloError } from 'apollo-server-core'

enum ErrorCodes {
  MISSING_ARGS = 'MISSING_ARGS',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
}

export class ApolloErrorMissingArgs extends ApolloError {
  constructor(properties?: Record<string, any>) {
    const message = properties?.message ?? ErrorCodes.MISSING_ARGS
    super(message, ErrorCodes.MISSING_ARGS, properties)

    this.extensions.status = 400

    Object.defineProperty(this, 'name', { value: ErrorCodes.MISSING_ARGS })
  }
}

export class ApolloResourceNotFound extends ApolloError {
  constructor(properties?: Record<string, any>) {
    const message = properties?.message ?? ErrorCodes.RESOURCE_NOT_FOUND
    super(message, ErrorCodes.RESOURCE_NOT_FOUND, properties)

    this.extensions.status = 404

    Object.defineProperty(this, 'name', {
      value: ErrorCodes.RESOURCE_NOT_FOUND,
    })
  }
}

export class ApolloForbidden extends ApolloError {
  constructor(properties?: Record<string, any>) {
    const message = properties?.message ?? ErrorCodes.FORBIDDEN
    super(message, ErrorCodes.FORBIDDEN, properties)

    this.extensions.status = 403

    Object.defineProperty(this, 'name', {
      value: ErrorCodes.FORBIDDEN,
    })
  }
}
