import { DateTimeResolver } from 'graphql-scalars'
import { Model, QueryBuilder } from 'objection'
import { Field, ID, ObjectType } from 'type-graphql'

import { RequestContext } from '../../globalTypes'
import {
  OrderOptions,
  Paginated,
  PaginationOptions,
} from '../../utils/PaginatedClass'

@ObjectType('BaseModel')
export class BaseModel extends Model {
  static async findByIds<M extends BaseModel>(
    ctx: RequestContext,
    ids: number[]
  ): Promise<M[]> {
    return this.findBy(ctx, 'id', ids)
  }

  static async findBy<M extends BaseModel>(
    ctx: RequestContext,
    key: string,
    values: any[]
  ): Promise<M[]> {
    const rows = (await this.query(ctx.trx)
      .select('*')
      .whereIn(key, values)) as M[]

    // Reorder rows is required by the Dataloader
    return values.map((val) =>
      rows.find((row) => String(row[key]) === String(val))
    )
  }

  static async parseOrder<M extends typeof BaseModel>(
    this: M,
    query: QueryBuilder<InstanceType<M>>,
    order: OrderOptions
  ) {
    if (order && order.field && order.direction)
      query.orderBy(order.field, order.direction)
  }

  static async paginate<M extends typeof BaseModel>(
    this: M,
    query: QueryBuilder<InstanceType<M>>,
    paginate?: PaginationOptions
  ): Promise<Paginated<InstanceType<M>>> {
    const countQuery = query.clone()

    countQuery.clearOrder()

    if (paginate) {
      query.offset(paginate.offset)
      query.limit(paginate.limit)
    }

    const nodes = await query

    const { total } = ((await countQuery
      .count(`${this.tableName}.id`, { as: 'total' })
      .first()) as unknown) as { total: number }

    return { nodes, total }
  }

  @Field((type) => ID)
  id: number | string

  @Field((type) => DateTimeResolver)
  createdAt: Date

  @Field((type) => DateTimeResolver)
  updatedAt: Date

  async $beforeUpdate(opts, queryContext) {
    super.$beforeUpdate(opts, queryContext)

    this.updatedAt = new Date()
  }
}
