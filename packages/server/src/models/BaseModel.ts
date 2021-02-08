import { DateTimeResolver } from 'graphql-scalars'
import { Model, snakeCaseMappers } from 'objection'
import { Field, ID, ObjectType } from 'type-graphql'

import { RequestContext } from '../globalTypes'

@ObjectType('BaseModel')
export class BaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers({ underscoreBeforeDigits: true })
  }

  static async findByIds<M extends BaseModel>(
    ctx: RequestContext = {},
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
