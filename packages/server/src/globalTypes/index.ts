import { Transaction } from 'knex'

import { UserModel } from '../models/user'
import { DataLoaderService } from '../utils/DataLoaderService'

export type UserJWTProfile = {
  id: string | number
}

export type RequestContext = {
  trx?: Transaction
  loaders?: DataLoaderService
  setJWT: (userId: UserModel) => Promise<void>
  removeJWT: () => void
  user: UserJWTProfile | null
}
