import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import { Server } from 'http'
import Knex from 'knex'
import Koa from 'koa'
import { Model } from 'objection'

import knexFile from '../knexfile'

import { RequestContext } from './globalTypes'
import { schema } from './middlewares/graphql'
import { DataLoaderService } from './utils/DataLoaderService'

const HTTP_PORT = 3001
const PLAYGROUND_URL = `http://localhost:${HTTP_PORT}/graphql`

export class App {
  private readonly koa: Koa
  private readonly apollo: ApolloServer
  private server: Server

  private corsOptions: cors.Options = {
    origin: (ctx) =>
      new RegExp('http://localhost:.*').test(ctx.header.origin)
        ? ctx.header.origin
        : false,
    credentials: true,
  }

  constructor() {
    this.apollo = new ApolloServer({
      schema,
      tracing: true,
      debug: true,
      introspection: true,
      playground: {
        settings: {
          'editor.cursorShape': 'line',
          'request.credentials': 'same-origin',
        },
        endpoint: '/graphql',
      },
      context: () => {
        const c: RequestContext = {}

        c.loaders = Object.freeze(new DataLoaderService(c))

        return c
      },
    })

    this.koa = new Koa()

    this.koa.use(cors(this.corsOptions))

    const knex = Knex(knexFile)

    Model.knex(knex)

    this.apollo.applyMiddleware({ app: this.koa })

    this.server = this.koa.listen({ port: HTTP_PORT }, () => {
      // eslint-disable-next-line
      console.log(`GraphQL Server ready at ${PLAYGROUND_URL}`)
    })
  }

  async test() {}
}
