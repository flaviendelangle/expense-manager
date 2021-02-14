import { GraphQLDateTime } from 'graphql-scalars'
import { map } from 'lodash'
import { QueryBuilder } from 'objection'
import { Field, InputType } from 'type-graphql'

import { BaseModel } from './BaseModel'

@InputType('DateFilter')
export class DateFilter {
  @Field((type) => GraphQLDateTime, { nullable: true })
  before?: Date

  @Field((type) => GraphQLDateTime, { nullable: true })
  after?: Date
}

export const filter: MethodDecorator = (target, propertyKey) =>
  Reflect.defineMetadata('model:filter', true, target, propertyKey)

export abstract class ParseFilters<M extends BaseModel, Filters extends {}> {
  protected query: QueryBuilder<M>
  protected filters: Filters

  constructor(query: QueryBuilder<M>, filters: Filters) {
    this.query = query
    this.filters = filters
  }

  parse = (): QueryBuilder<M> => {
    const fns = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(
      (p) =>
        typeof this[p] === 'function' &&
        Reflect.getMetadata('model:filter', this, p) === true
    )

    map(fns, (fn: string) => {
      const result = this[fn]()
      return result
    })

    return this.query
  }
}
