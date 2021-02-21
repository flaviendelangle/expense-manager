import convict from 'convict'
import * as dotenv from 'dotenv'

dotenv.config()

export const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The API port',
    format: Number,
    default: null,
    env: 'PORT',
  },
  apollo: {
    debug: {
      doc: 'Activate apollo debug',
      default: false,
      format: Boolean,
      env: 'APOLLO_DEBUG',
    },
    tracing: {
      doc: 'Activate the apollo tracing feature',
      default: false,
      format: Boolean,
      env: 'APOLLO_TRACING',
    },
  },
  jwtSecret: {
    doc: 'The JWT secret used to decode JWT tokens',
    default: null,
    format: String,
    env: 'JWT_SECRET',
  },
})

config.loadFile(`${__dirname}/config.${config.get('env')}.json`)
config.validate({ allowed: 'strict' })
