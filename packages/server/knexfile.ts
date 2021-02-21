import { knexSnakeCaseMappers } from 'objection'

import { config } from './src/config'

const pgConnection = config.get('database')

const dbConfig = {
  client: 'pg',
  connection: pgConnection,
  useNullAsDefault: true,
  ...knexSnakeCaseMappers(),
}

export = dbConfig
