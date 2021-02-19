import { Transaction } from 'knex'

import { DataLoaderService } from '../utils/DataLoaderService'

export type UserJWTProfile = {
  id: string | number
}

export type RequestContext = {
  trx?: Transaction
  loaders?: DataLoaderService
  setJWT: (userId: string | number) => Promise<void>
  removeJWT: () => void
  user: UserJWTProfile | null
}
