import { Transaction } from 'knex'

import { DataLoaderService } from '../utils/DataLoaderService'

export type RequestContext = {
  trx?: Transaction
  loaders?: DataLoaderService
}
