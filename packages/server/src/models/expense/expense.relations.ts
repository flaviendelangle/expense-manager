import { Model, RelationMappings } from 'objection'

import { RefundModel } from '../refund'

import { ExpenseModel } from './expense.model'

export const expenseRelationMappings = (): RelationMappings => ({
  refund: {
    relation: Model.BelongsToOneRelation,
    modelClass: RefundModel,
    join: {
      from: `${ExpenseModel.tableName}.refundId`,
      to: `${RefundModel.tableName}.id`,
    },
  },
})
