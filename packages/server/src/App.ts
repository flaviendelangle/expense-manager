import { ApolloServer } from 'apollo-server-koa'
import { Server } from 'http'
import Knex from 'knex'
import Koa from 'koa'
import { Model } from 'objection'

import knexFile from '../knexfile'

import { schema } from './middlewares/graphql'

const HTTP_PORT = 3001
const PLAYGROUND_URL = `http://localhost:${HTTP_PORT}/graphql`

export class App {
  private readonly koa: Koa
  private readonly apollo: ApolloServer
  private server: Server

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
    })

    this.koa = new Koa()

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
