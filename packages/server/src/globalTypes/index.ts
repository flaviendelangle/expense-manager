import { Transaction } from 'knex'

export type RequestContext = {
  trx?: Transaction
  loaders?: DataLoaderService
}
